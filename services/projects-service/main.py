from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import models, schemas, database

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="Kinematics Hub Projects Service")

@app.post("/projects/", response_model=schemas.Project)
def create_project(project: schemas.ProjectCreate, db: Session = Depends(database.get_db)):
    db_project = models.Project(**project.dict())
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

@app.get("/projects/", response_model=List[schemas.Project])
def read_projects(skip: int = 0, limit: int = 100, featured: bool = False, db: Session = Depends(database.get_db)):
    query = db.query(models.Project)
    if featured:
        query = query.filter(models.Project.is_featured == True)
    return query.offset(skip).limit(limit).all()

@app.post("/projects/{project_id}/artifacts/", response_model=schemas.Artifact)
def create_artifact(project_id: int, artifact: schemas.ArtifactCreate, db: Session = Depends(database.get_db)):
    db_artifact = models.ProjectArtifact(**artifact.dict(), project_id=project_id)
    db.add(db_artifact)
    db.commit()
    db.refresh(db_artifact)
    return db_artifact

@app.get("/")
def read_root():
    return {"message": "Projects Service is running"}
