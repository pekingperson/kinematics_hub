from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime

class Project(Base):
    __tablename__ = "projects"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    abstract = Column(Text)
    course_id = Column(Integer, nullable=True) # Optional link to a course
    is_featured = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    members = relationship("ProjectMember", back_populates="project")
    artifacts = relationship("ProjectArtifact", back_populates="project")

class ProjectMember(Base):
    __tablename__ = "project_members"
    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"))
    user_id = Column(Integer)
    role = Column(String) # e.g., "Lead", "Contributor"

    project = relationship("Project", back_populates="members")

class ProjectArtifact(Base):
    __tablename__ = "project_artifacts"
    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"))
    name = Column(String)
    url = Column(String) # Link to PDF, Video, or Tool Model ID
    type = Column(String) # "pdf", "video", "tool_model"

    project = relationship("Project", back_populates="artifacts")
