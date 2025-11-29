from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class ToolModelBase(BaseModel):
    name: str
    type: str # "4bar", "5bar", "robot_arm"
    data: Dict[str, Any] # JSON payload for the model parameters

class ToolModelCreate(ToolModelBase):
    pass

class ToolModel(ToolModelBase):
    id: str # UUID
