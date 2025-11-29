from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import models, schemas, database

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="Kinematics Hub Community Service")

@app.post("/spaces/", response_model=schemas.Space)
def create_space(space: schemas.SpaceCreate, db: Session = Depends(database.get_db)):
    db_space = models.Space(**space.dict())
    db.add(db_space)
    db.commit()
    db.refresh(db_space)
    return db_space

@app.get("/spaces/", response_model=List[schemas.Space])
def read_spaces(skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db)):
    return db.query(models.Space).offset(skip).limit(limit).all()

@app.post("/spaces/{space_id}/topics/", response_model=schemas.Topic)
def create_topic(space_id: int, topic: schemas.TopicCreate, user_id: int = 1, db: Session = Depends(database.get_db)):
    # Note: user_id should come from JWT token in real impl
    db_topic = models.Topic(title=topic.title, space_id=space_id, author_id=user_id)
    db.add(db_topic)
    db.commit()
    db.refresh(db_topic)
    
    db_post = models.Post(content=topic.initial_post, topic_id=db_topic.id, author_id=user_id)
    db.add(db_post)
    db.commit()
    
    return db_topic

@app.get("/spaces/{space_id}/topics/", response_model=List[schemas.Topic])
def read_topics(space_id: int, skip: int = 0, limit: int = 100, db: Session = Depends(database.get_db)):
    return db.query(models.Topic).filter(models.Topic.space_id == space_id).offset(skip).limit(limit).all()

@app.get("/")
def read_root():
    return {"message": "Community Service is running"}
