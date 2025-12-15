from pydantic import BaseModel, EmailStr

# ---- Schemas de entrada ----

class UserRegister(BaseModel):
    username: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


# ---- Schemas de salida ----

class UserPublic(BaseModel):
    id: int
    username: str
    email: EmailStr

    class Config:
        from_attributes = True 


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
