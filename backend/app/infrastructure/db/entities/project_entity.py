from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.sql import func
from app.infrastructure.db.session import Base
from sqlalchemy.orm import relationship


class ProjectEntity(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    description = Column(String(255))
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now(), server_default=func.now())

    boards = relationship(
    "BoardEntity",
    back_populates="project",
    cascade="all, delete-orphan"
)

    members = relationship(
    "ProjectMemberEntity",
    back_populates="project",
    cascade="all, delete-orphan"
)

