from sqlalchemy import Column, Integer, String
from app.infrastructure.db.session import Base
from sqlalchemy.orm import relationship

class UserEntity(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)

    project_members = relationship(
    "ProjectMemberEntity",
    back_populates="user",
    cascade="all, delete-orphan"
)

