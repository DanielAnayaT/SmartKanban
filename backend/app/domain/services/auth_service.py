from app.domain.repositories.user_repository import UserRepository
from app.domain.models.user import User
from app.core.security import hash_password, verify_password, create_access_token
from app.core.errors import (UsernameAlreadyExistsError, EmailAlreadyExistsError)

class AuthService:
    def __init__(self, user_repo: UserRepository):
        self.user_repo = user_repo

    def register_user(self, username, email, password):
        if self.user_repo.get_by_username(username):
            raise UsernameAlreadyExistsError("Username already exists")
        if self.user_repo.get_by_email(email):
            raise EmailAlreadyExistsError("Email already exists")
        hashed = hash_password(password)
        user = User(id=None, username=username, email=email, hashed_password=hashed)
        return self.user_repo.create(user)

    def login_user(self, email, password):
        user = self.user_repo.get_by_email(email)
        if not user or not verify_password(password, user.hashed_password):
            return None
        token = create_access_token({"sub": user.email})
        return token

    def get_user_by_email(self, email: str):
        user = self.user_repo.get_by_email(email)
        if not user:
            raise ValueError(f"Usuario con email '{email}' no existe")
        return user