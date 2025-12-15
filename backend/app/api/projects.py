from fastapi import APIRouter, Depends, HTTPException, status
from app.schemas.project import ProjectCreate, ProjectOut
from app.domain.services.project_service import ProjectService
from app.infrastructure.db.repositories.sqlalchemy_project_repository import SQLAlchemyProjectRepository
from sqlalchemy.orm import Session
from app.core.errors import ProjectNotFoundError

router = APIRouter()
project_repo = SQLAlchemyProjectRepository()
project_service = ProjectService(project_repo)


# Crear proyecto
@router.post("/", response_model=ProjectOut)
def create_project(project: ProjectCreate, owner_id: int):
    return project_service.create_project(project.name, project.description, owner_id)

# Listar proyectos de un usuario
@router.get("/", response_model=list[ProjectOut])
def list_projects(owner_id: int):
    return project_service.list_projects_by_owner(owner_id)

# Obtener proyecto por id
@router.get("/{project_id}", response_model=ProjectOut)
def get_project(project_id: int):
    try:
        return project_service.get_project(project_id)
    except ProjectNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))

# Borrar proyecto
@router.delete("/{project_id}")
def delete_project(project_id: int):
    project_service.delete_project(project_id)
    return {"detail": "Proyecto eliminado"}
