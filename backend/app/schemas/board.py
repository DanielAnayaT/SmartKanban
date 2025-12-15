from pydantic import BaseModel
from datetime import datetime

class BoardCreate(BaseModel):
    name: str
    project_id: int

class BoardOut(BaseModel):
    id: int
    name: str
    project_id: int
    created_at: datetime
    updated_at: datetime
