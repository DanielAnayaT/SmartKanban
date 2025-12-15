from sqlalchemy import Column, Integer, String, Text, ForeignKey
from app.infrastructure.db.session import Base

class TaskORM(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    list_id = Column(Integer, ForeignKey("lists.id"), nullable=False)
