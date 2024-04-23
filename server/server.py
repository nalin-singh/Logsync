from fastapi import FastAPI, HTTPException,  File, UploadFile
from fastapi.responses import FileResponse, JSONResponse
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

class OrderRequest(BaseModel):
    seller_id: str
    buyer_id: str
    contract_id : str
    FG_qty: dict
    order_date: str
    

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

@app.post("/document_parser/")
async def document_parser(file: UploadFile = File(...)):
    try:
        with open(f"uploads/{file.filename}", "wb") as f:
            f.write(file.file.read())
        return JSONResponse(content={"message": "File uploaded successfully"}, status_code=200)
    except Exception as e:
        return JSONResponse(content={"message": f"An error occurred: {str(e)}"}, status_code=500)
    
    """Code to parse the document and returning the fields come here"""
    
@app.post("/contract_into_db/")
async def contract_into_db(form_data: ContractRequest):
    """code to insert into db"""
    """code to push a notification into the database and an approval action to the buyer"""
    """code to delete the line if buyer rejects the details"""

@app.post("/return_contract_list/")
async def return_contract_list(id: str):
    """Code to query the contract db and return a dict of dict on contract id back to front end"""

@app.post("/return_FG_list/")
async def return_FG_list(id: str):
    """Code to query the FG db and return a dict of FG and minimum qty back to front end"""

@app.post("/create_order")
async def create_order(order_data: OrderRequest):
    """we receive a dict from front end having list of FG's and qty and buyer and seller id and contract id (if applicable)"""
    """We then add a row in open po db as order placed and send a notification"""
    """We then create an invoice in the backend and send the same to both with notification alongwith line to invoices db"""




if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
