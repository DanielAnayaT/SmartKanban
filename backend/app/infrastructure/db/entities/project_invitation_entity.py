from sqlalchemy import Column, Integer, ForeignKey, String
from sqlalchemy.orm import relationship
from app.infrastructure.db.session import Base

class ProjectInvitationEntity(Base):
    __tablename__ = "project_invitations"

    id = Column(Integer, primary_key=True)
    project_id = Column(Integer, ForeignKey("projects.id", ondelete="CASCADE"))
    email = Column(String, nullable=False)
    status = Column(String, default="pending") 