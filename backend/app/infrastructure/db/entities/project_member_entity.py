from sqlalchemy import Column, Integer, ForeignKey, Enum
from sqlalchemy.orm import relationship
import enum

from app.infrastructure.db.session import Base

class ProjectRole(enum.Enum):
    OWNER = "OWNER"
    MEMBER = "MEMBER"

class ProjectMemberEntity(Base):
    __tablename__ = "project_members"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    project_id = Column(Integer, ForeignKey("projects.id", ondelete="CASCADE"))
    role = Column(Enum(ProjectRole), nullable=False)

    user = relationship("UserEntity", back_populates="project_members")
    project = relationship("ProjectEntity", back_populates="members")
