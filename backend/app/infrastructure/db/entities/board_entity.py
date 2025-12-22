from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.sql import func
from app.infrastructure.db.session import Base
from sqlalchemy.orm import relationship


class BoardEntity(Base):
    __tablename__ = "boards"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    project_id = Column(Integer, ForeignKey("projects.id", ondelete="CASCADE"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now(), server_default=func.now())

    project = relationship("ProjectEntity", back_populates="boards")

    lists = relationship(
        "ListORM",
        back_populates="board",
        cascade="all, delete-orphan"
    )
