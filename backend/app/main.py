from fastapi import FastAPI
from app.api.auth import router as auth_router
from app.infrastructure.db.session import Base, engine
from app.infrastructure.db.entities.user_entity import UserEntity
from app.api.projects import router as projects_router
from app.api.boards import router as boards_router
from app.api.lists import router as lists_router
from app.api.tasks import router as tasks_router
from fastapi.middleware.cors import CORSMiddleware

# Crear tablas
Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:5173",  # Vite
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/auth")
app.include_router(projects_router, prefix="/projects")
app.include_router(boards_router, prefix="/boards")
app.include_router(lists_router, prefix="/lists")
app.include_router(tasks_router, prefix="/tasks")
