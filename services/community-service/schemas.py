from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class PostBase(BaseModel):
    content: str

class PostCreate(PostBase):
    pass

class Post(PostBase):
    id: int
    topic_id: int
    author_id: int
    created_at: datetime

    class Config:
        orm_mode = True

class TopicBase(BaseModel):
    title: str

class TopicCreate(TopicBase):
    initial_post: str

class Topic(TopicBase):
    id: int
    space_id: int
    author_id: int
    created_at: datetime
    posts: List[Post] = []

    class Config:
        orm_mode = True

class SpaceBase(BaseModel):
    name: str
    description: Optional[str] = None

class SpaceCreate(SpaceBase):
    pass

class Space(SpaceBase):
    id: int
    topics: List[Topic] = []

    class Config:
        orm_mode = True
