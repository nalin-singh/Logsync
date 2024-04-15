from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel
import uvicorn
import os
from Documents.create_contract import SalesContract  
from Documents.create_invoice import create_invoice
from typing import List, Dict, Optional

app = FastAPI()

class ContractRequest(BaseModel):
    seller: dict
    buyer: dict
    product_details: list
    terms_conditions: list
    additional_documents: dict
    logo_path: str
    signature_paths: dict
    

class Item(BaseModel):
    description: str
    unit_cost: float
    quantity: int
    note: Optional[str] = None

class InvoiceData(BaseModel):
    business_name: str
    business_address: str
    customer_name: str
    customer_address: str
    invoice_number: str
    order_date: str
    invoice_date: str
    items: List[Item]
    tax_rate: float
    payment_terms: str
    purchase_order_number: str

@app.post("/generate_contract/")
async def generate_contract(request: ContractRequest):
    try:
        contract = SalesContract(
            seller=request.seller,
            buyer=request.buyer,
            product_details=request.product_details,
            terms_conditions=request.terms_conditions,
            additional_documents=request.additional_documents,
            logo_path=request.logo_path,
            signature_paths=request.signature_paths
        )
        filename = "Sales_Contract.pdf"
        contract.generate_contract(filename)
        return {"message": "Contract generated successfully", "filename": filename}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@app.post("/generate_invoice/")
async def generate_invoice(invoice_data: InvoiceData):
    pdf_file = create_invoice(invoice_data)
    return FileResponse(path=pdf_file, filename=pdf_file, media_type='application/pdf')

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
