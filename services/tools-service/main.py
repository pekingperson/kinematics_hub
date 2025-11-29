from fastapi import FastAPI, HTTPException
from typing import List, Dict
import schemas
import uuid

app = FastAPI(title="Kinematics Hub Tools Service")

# In-memory storage for MVP
tool_models: Dict[str, schemas.ToolModel] = {}

@app.post("/models/", response_model=schemas.ToolModel)
def create_model(model: schemas.ToolModelCreate):
    # Basic validation
    if model.type not in ["4bar", "5bar", "robot_arm"]:
        raise HTTPException(status_code=400, detail="Invalid tool type. Must be '4bar', '5bar', or 'robot_arm'.")
    
    if not model.data:
        raise HTTPException(status_code=400, detail="Model data cannot be empty.")

    model_id = str(uuid.uuid4())
    new_model = schemas.ToolModel(id=model_id, **model.dict())
    tool_models[model_id] = new_model
    return new_model

@app.get("/models/{model_id}", response_model=schemas.ToolModel)
def read_model(model_id: str):
    if model_id not in tool_models:
        raise HTTPException(status_code=404, detail="Model not found")
    return tool_models[model_id]

@app.get("/")
def read_root():
    return {"message": "Tools Service is running"}
