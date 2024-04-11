"""
LogSync AI Server 
"""

from fastapi import FastAPI

app = FastAPI()


@app.get("/")
async def check() -> dict:
    """
    Health Check API
    """
    return {"Message": "Server is up and running!"}
