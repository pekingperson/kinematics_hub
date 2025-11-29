from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from scraper import NewsScraper

app = FastAPI(title="Kinematics Hub News Service")
scraper = NewsScraper()

class NewsItem(BaseModel):
    title: str
    link: str
    published: str
    summary: str
    source: str

@app.get("/news", response_model=List[NewsItem])
def get_news():
    return scraper.get_news()

@app.post("/subscribe")
def subscribe(email: str):
    # Mock subscription
    return {"message": f"Subscribed {email} to weekly digest"}

@app.get("/")
def read_root():
    return {"message": "News Service is running"}
