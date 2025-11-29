from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime

class Space(Base):
    __tablename__ = "spaces"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    description = Column(Text)
    topics = relationship("Topic", back_populates="space")

class Topic(Base):
    __tablename__ = "topics"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    space_id = Column(Integer, ForeignKey("spaces.id"))
    author_id = Column(Integer) # ID from Auth Service
    created_at = Column(DateTime, default=datetime.utcnow)
    
    space = relationship("Space", back_populates="topics")
    posts = relationship("Post", back_populates="topic")

class Post(Base):
    __tablename__ = "posts"
    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text)
    topic_id = Column(Integer, ForeignKey("topics.id"))
    author_id = Column(Integer) # ID from Auth Service
    created_at = Column(DateTime, default=datetime.utcnow)

    topic = relationship("Topic", back_populates="posts")
