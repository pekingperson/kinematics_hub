from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from client import SemanticScholarClient

app = FastAPI(title="Kinematics Hub Papers Service")
client = SemanticScholarClient()

class Paper(BaseModel):
    paperId: str
    title: str
    year: Optional[int] = None
    abstract: Optional[str] = None
    url: Optional[str] = None
    authors: List[dict] = []

@app.get("/search", response_model=List[Paper])
def search_papers(query: str):
    results = client.search_papers(query)
    return results

@app.get("/paper/{paper_id}", response_model=Paper)
def get_paper(paper_id: str):
    result = client.get_paper_details(paper_id)
    if not result:
        raise HTTPException(status_code=404, detail="Paper not found")
    return result

@app.get("/")
def read_root():
    return {"message": "Papers Service is running"}
