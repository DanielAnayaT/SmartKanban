from passlib.context import CryptContext
import hashlib
from datetime import datetime, timedelta
from jose import jwt, JWTError
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.core.config import SECRET_KEY, ACCESS_TOKEN_EXPIRE_MINUTES
from app.infrastructure.db.session import get_db
from app.infrastructure.db.repositories.sqlalchemy_user_repository import SQLAlchemyUserRepository

# ======================
# CONFIG
# ======================

ALGORITHM = "HS256"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# ======================
# PASSWORDS
# ======================

def _normalize_password(password: str) -> str:
    """
    Convierte la contraseña a un hash SHA-256
    para evitar el límite de 72 bytes de bcrypt
    """
    return hashlib.sha256(password.encode("utf-8")).hexdigest()

def hash_password(password: str) -> str:
    normalized = _normalize_password(password)
    return pwd_context.hash(normalized)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    normalized = _normalize_password(plain_password)
    return pwd_context.verify(normalized, hashed_password)

# ======================
# JWT
# ======================

def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    if "sub" in to_encode:
        to_encode["sub"] = str(to_encode["sub"])
    expire = datetime.now() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode["exp"] = int(expire.timestamp())
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# ======================
# CURRENT USER
# ======================

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Token inválido o expirado",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        print("Decoding token:", repr(token))
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        print("hello")
        print("payload:", payload)
        user_id = payload.get("sub")
        print("user_id:", user_id)
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user_repo = SQLAlchemyUserRepository(db)
    user = user_repo.get_by_id(int(user_id))

    if user is None:
        raise credentials_exception

    return user
