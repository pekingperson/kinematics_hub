from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import models, schemas, database

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="Kinematics Hub Events Service")

@app.post("/events/", response_model=schemas.Event)
def create_event(event: schemas.EventCreate, user_id: int = 1, db: Session = Depends(database.get_db)):
    db_event = models.Event(**event.dict(), organizer_id=user_id)
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event

@app.get("/events/", response_model=List[schemas.Event])
def read_events(skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db)):
    return db.query(models.Event).offset(skip).limit(limit).all()

@app.post("/events/{event_id}/register", response_model=schemas.Registration)
def register_event(event_id: int, user_id: int = 1, db: Session = Depends(database.get_db)):
    db_reg = models.Registration(event_id=event_id, user_id=user_id)
    db.add(db_reg)
    db.commit()
    db.refresh(db_reg)
    return db_reg

@app.get("/")
def read_root():
    return {"message": "Events Service is running"}
