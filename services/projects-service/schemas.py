from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class ProjectBase(BaseModel):
    title: str
    abstract: str
    course_id: Optional[int] = None
    is_featured: bool = False

class ProjectCreate(ProjectBase):
    pass

class Project(ProjectBase):
    id: int
    created_at: datetime
    
    class Config:
        orm_mode = True

class ArtifactBase(BaseModel):
    name: str
    url: str
    type: str

class ArtifactCreate(ArtifactBase):
    pass

class Artifact(ArtifactBase):
    id: int
    project_id: int

    class Config:
        orm_mode = True
