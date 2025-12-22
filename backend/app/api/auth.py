from app.infrastructure.db.session import get_db
from fastapi import APIRouter, HTTPException, status
from app.domain.services.auth_service import AuthService
from app.infrastructure.db.repositories.sqlalchemy_user_repository import SQLAlchemyUserRepository
from app.schemas.user import UserRegister, UserLogin, UserPublic, Token
from app.core.errors import (UsernameAlreadyExistsError, EmailAlreadyExistsError)
from sqlalchemy.orm import Session
from fastapi import Depends

router = APIRouter()

def get_auth_service(db: Session = Depends(get_db)) -> AuthService:
    repo = SQLAlchemyUserRepository(db)
    return AuthService(repo)

@router.post("/register", response_model=UserPublic)
def register(user: UserRegister, auth_service: AuthService = Depends(get_auth_service)):

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
def login(user: UserLogin, auth_service: AuthService = Depends(get_auth_service)):
    token = auth_service.login_user(user.email, user.password)
    if not token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    return {"access_token": token, "token_type": "bearer"}

@router.get("/users/{email}", response_model=UserPublic)
def get_user(email: str, auth_service: AuthService = Depends(get_auth_service)):
    try:
        user = auth_service.get_user_by_email(email)
        return UserPublic(id=user.id, username=user.username, email=user.email)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )