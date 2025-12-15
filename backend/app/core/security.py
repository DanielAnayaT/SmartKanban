from passlib.context import CryptContext
import hashlib
from datetime import datetime, timedelta
from jose import jwt
from app.core.config import SECRET_KEY, ACCESS_TOKEN_EXPIRE_MINUTES

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def _normalize_password(password: str) -> str:
    """
    Convierte la contraseña a un hash SHA-256
    para evitar el límite de 72 bytes de bcrypt
    """
    return hashlib.sha256(password.encode("utf-8")).hexdigest()

def hash_password(password: str) -> str:
    print(">>> USANDO HASH_PASSWORD NORMALIZADO <<<")
    normalized = _normalize_password(password)
    return pwd_context.hash(normalized)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    normalized = _normalize_password(plain_password)
    return pwd_context.verify(normalized, hashed_password)

def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.now() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm="HS256")
