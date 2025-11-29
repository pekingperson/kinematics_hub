from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class EventBase(BaseModel):
    title: str
    description: Optional[str] = None
    start_time: datetime
    end_time: datetime
    location: Optional[str] = None

class EventCreate(EventBase):
    pass

class Event(EventBase):
    id: int
    organizer_id: int
    
    class Config:
        orm_mode = True

class Registration(BaseModel):
    id: int
    event_id: int
    user_id: int
    registered_at: datetime

    class Config:
        orm_mode = True
