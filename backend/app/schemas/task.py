from pydantic import BaseModel

class TaskCreate(BaseModel):
    title: str
    description: str | None = None
    list_id: int

class TaskOut(BaseModel):
    id: int
    title: str
    description: str | None
    list_id: int

    class Config:
        from_attributes = True
