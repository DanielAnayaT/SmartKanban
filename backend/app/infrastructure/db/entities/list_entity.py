from sqlalchemy import Column, Integer, String, ForeignKey
from app.infrastructure.db.session import Base

class ListORM(Base):
    __tablename__ = "lists"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    board_id = Column(Integer, ForeignKey("boards.id"), nullable=False)
