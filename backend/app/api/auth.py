from fastapi import APIRouter, HTTPException, status
from app.domain.services.auth_service import AuthService
from app.infrastructure.db.repositories.sqlalchemy_user_repository import SQLAlchemyUserRepository
from app.schemas.user import UserRegister, UserLogin, UserPublic, Token
from app.core.errors import (UsernameAlreadyExistsError, EmailAlreadyExistsError)

router = APIRouter()
user_repo = SQLAlchemyUserRepository()
auth_service = AuthService(user_repo)

@router.post("/register", response_model=UserPublic)
def register(user: UserRegister):

    try:
        return auth_service.register_user(
            user.username,
            user.email,
            user.password
        )

    except UsernameAlreadyExistsError as e:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=str(e)
        )

    except EmailAlreadyExistsError as e:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=str(e)
        )

@router.post("/login", response_model=Token)
def login(user: UserLogin):
    token = auth_service.login_user(user.email, user.password)
    if not token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    return {"access_token": token, "token_type": "bearer"}

@router.get("/users/{email}", response_model=UserPublic)
def get_user(email: str):
    try:
        user = auth_service.get_user_by_email(email)
        return UserPublic(id=user.id, username=user.username, email=user.email)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )