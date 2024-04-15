from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fpdf import FPDF
from typing import List, Dict, Optional



def create_invoice(invoice_data) -> str:
    pdf = FPDF()
    pdf.add_page()

    # Add company logo and header
    pdf.set_font("Arial", 'B', 16)
    pdf.cell(200, 10, "Invoice", ln=True, align='C')
    
    # Business and customer information
    pdf.set_font("Arial", size=12)
    add_invoice_section(pdf, f"Business Name: {invoice_data.business_name}")
    add_invoice_section(pdf, f"Business Address: {invoice_data.business_address}")
    add_invoice_section(pdf, f"Customer Name: {invoice_data.customer_name}")
    add_invoice_section(pdf, f"Customer Address: {invoice_data.customer_address}")

    # Invoice details
    add_invoice_section(pdf, f"Invoice Number: {invoice_data.invoice_number}")
    add_invoice_section(pdf, f"Order Date: {invoice_data.order_date}")
    add_invoice_section(pdf, f"Invoice Date: {invoice_data.invoice_date}")

    # Itemized details
    for item in invoice_data.items:
        item_description = f"{item.description} | ${item.unit_cost} | {item.quantity}"
        if item.note:
            item_description += f" | Note: {item.note}"
        add_invoice_section(pdf, item_description)
    
    # Calculate totals
    sub_total = sum(item.unit_cost * item.quantity for item in invoice_data.items)
    tax_amount = calculate_taxes(sub_total, invoice_data.tax_rate)
    total_amount = sub_total + tax_amount

    add_invoice_section(pdf, f"Subtotal: ${sub_total:.2f}")
    add_invoice_section(pdf, f"Taxes: ${tax_amount:.2f} ({invoice_data.tax_rate}%)")
    add_invoice_section(pdf, f"Total Amount: ${total_amount:.2f}")
    add_invoice_section(pdf, f"Payment Terms: {invoice_data.payment_terms}")

    pdf_file = "invoice.pdf"
    pdf.output(pdf_file)
    return pdf_file

def add_invoice_section(pdf, text: str):
    pdf.cell(200, 10, text, ln=True)

def calculate_taxes(sub_total: float, tax_rate: float) -> float:
    return sub_total * (tax_rate / 100)

