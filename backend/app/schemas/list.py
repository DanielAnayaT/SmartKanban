from pydantic import BaseModel

class ListCreate(BaseModel):
    name: str
    board_id: int

class ListOut(BaseModel):
    id: int
    name: str
    board_id: int

    class Config:
        from_attributes = True
