from sqlalchemy import Column, Integer, String, ForeignKey
from app.infrastructure.db.session import Base
from sqlalchemy.orm import relationship

class ListORM(Base):
    __tablename__ = "lists"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    board_id = Column(Integer, ForeignKey("boards.id", ondelete="CASCADE"), nullable=False)
    position = Column(Integer, nullable=False, default=0)

    board = relationship("BoardEntity", back_populates="lists")

    tasks = relationship(
        "TaskORM",
        back_populates="list",
        cascade="all, delete-orphan"
    )