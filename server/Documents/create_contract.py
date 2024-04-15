from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Table, TableStyle, Image, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY

class SalesContract:
    def __init__(self, seller, buyer, product_details, terms_conditions, additional_documents, logo_path, signature_paths):
        self.seller = seller
        self.buyer = buyer
        self.product_details = product_details
        self.terms_conditions = terms_conditions
        self.additional_documents = additional_documents
        self.logo_path = logo_path
        self.signature_paths = signature_paths

    def generate_contract(self, filename):
        doc = SimpleDocTemplate(filename, pagesize=A4)
        story = []
        styles = getSampleStyleSheet()
        styles.add(ParagraphStyle(name='Left', alignment=TA_LEFT))
        styles.add(ParagraphStyle(name='Justify', parent=styles['BodyText'], alignment=TA_JUSTIFY))
        styles.add(ParagraphStyle(name='Signature', parent=styles['Normal'], alignment=TA_CENTER, spaceAfter=12, fontSize=12))

        # Logo
        if self.logo_path:
            story.append(Image(self.logo_path, 4*inch, 1*inch))
            story.append(Spacer(1, 12))

        # Title
        story.append(Paragraph("<b>SALES CONTRACT</b>", styles["Title"]))
        story.append(Spacer(1, 12))

        # Introduction
        intro = f"""<b>This Sales Contract ("Contract") is made and entered into as of {self.seller['date']}, by and between:</b><br/><br/>
        <b>{self.seller['company_name']}</b><br/>
        Address: {self.seller['address']}<br/>
        Phone: {self.seller['phone']}<br/>
        Email: {self.seller['email']}<br/>
        ("Seller")<br/><br/>
        <b>AND</b><br/><br/>
        <b>{self.buyer['company_name']}</b><br/>
        Address: {self.buyer['address']}<br/>
        Phone: {self.buyer['phone']}<br/>
        Email: {self.buyer['email']}<br/>
        ("Buyer")"""
        story.append(Paragraph(intro, styles["Justify"]))
        story.append(Spacer(1, 12))

        # WHEREAS clauses
        whereas = """<b>WHEREAS</b>, the Seller is a renowned manufacturer and seller of high-quality batteries designed for various applications; and<br/>
        <b>WHEREAS</b>, the Buyer is engaged in the manufacturing of electric vehicles and requires reliable battery supplies for its products;<br/>
        <b>NOW, THEREFORE</b>, in consideration of the mutual covenants and promises herein contained, the parties hereto agree as follows:"""
        story.append(Paragraph(whereas, styles["Justify"]))
        story.append(Spacer(1, 12))

        # Product Details Table
        headers = ["SKU", "Product Description", "Battery Type", "Unit Price"]
        table_data = [headers] + [[product['SKU'], product['Product Description'], product['Battery Type'], product['Unit Price']] for product in self.product_details]
        product_table = Table(table_data)
        product_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.gray),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
            ('GRID', (0, 0), (-1, -1), 1, colors.black)
        ]))
        story.append(Spacer(1, 12))
        story.append(product_table)
        story.append(Spacer(1, 12))

        # Terms and Conditions
        for term in self.terms_conditions:
            story.append(Paragraph(f"<b>{term['title']}</b>", styles["Heading2"]))
            for item in term['items']:
                story.append(Paragraph(item, styles["BodyText"]))
                story.append(Spacer(1, 12))

        # Additional Documents
        for doc_title, doc_content in self.additional_documents.items():
            story.append(Paragraph(f"<b>{doc_title}</b>", styles["Heading2"]))
            story.append(Paragraph(doc_content, styles["BodyText"]))
            story.append(Spacer(1, 12))

        # Signatures
        story.append(Paragraph("IN WITNESS WHEREOF, the parties hereto have executed this Sales Contract as of the day and year first above written.", styles["Justify"]))
        story.append(Spacer(1, 24))
        if self.signature_paths['seller']:
            story.append(Image(self.signature_paths['seller'], 2*inch, 0.5*inch))
        story.append(Paragraph(f"Name: {self.seller['signatory_name']}<br/>Title: {self.seller['signatory_title']}", styles["Signature"]))
        story.append(Spacer(1, 12))
        if self.signature_paths['buyer']:
            story.append(Image(self.signature_paths['buyer'], 2*inch, 0.5*inch))
        story.append(Paragraph(f"Name: {self.buyer['signatory_name']}<br/>Title: {self.buyer['signatory_title']}", styles["Signature"]))

        # Build PDF
        doc.build(story)
        print(f"PDF '{filename}' created successfully!")
