from app.domain.repositories.user_repository import UserRepository
from app.domain.models.user import User
from app.infrastructure.db.entities.user_entity import UserEntity
from sqlalchemy.orm import Session

class SQLAlchemyUserRepository(UserRepository):
    def __init__(self, db: Session):
        self.db = db

    def get_by_email(self, email: str) -> User | None:
        entity = self.db.query(UserEntity).filter(UserEntity.email == email).first()
        if not entity:
            return None
        return User(entity.id, entity.username, entity.email, entity.hashed_password)

    def create(self, user: User) -> User:
        entity = UserEntity(
            username=user.username,
            email=user.email,
            hashed_password=user.hashed_password
        )
        self.db.add(entity)
        self.db.commit()
        self.db.refresh(entity)
        return User(entity.id, entity.username, entity.email, entity.hashed_password)

    def get_by_username(self, username: str):
        entity = self.db.query(UserEntity).filter(UserEntity.username==username).first()
        if not entity:
            return None
        return User(entity.id, entity.username, entity.email, entity.hashed_password)
    
    def get_by_id(self, user_id: int) -> User | None:
        entity = self.db.query(UserEntity).filter(UserEntity.id == user_id).first()
        if not entity:
            return None
        return User(entity.id, entity.username, entity.email, entity.hashed_password)