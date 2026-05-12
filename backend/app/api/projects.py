from app.core.security import get_current_user
from app.infrastructure.db.session import get_db
from app.infrastructure.db.repositories.sqlalchemy_board_repository import SQLAlchemyBoardRepository
from fastapi import APIRouter, Depends, HTTPException, status
from app.schemas.project import ProjectCreate, ProjectOut
from app.domain.services.project_service import ProjectService
from app.infrastructure.db.repositories.sqlalchemy_project_repository import SQLAlchemyProjectRepository
from sqlalchemy.orm import Session
from app.core.errors import ProjectNotFoundError
from app.core.authorization import get_project_membership, require_project_owner

router = APIRouter()

def get_project_service(db: Session = Depends(get_db)) -> ProjectService:
    repo = SQLAlchemyProjectRepository(db)
    board_repo = SQLAlchemyBoardRepository(db)
    return ProjectService(repo, board_repo)


# Crear proyecto
@router.post("/", response_model=ProjectOut)
def create_project(project: ProjectCreate, current_user= Depends(get_current_user), project_service: ProjectService = Depends(get_project_service)):
    try:
        return project_service.create_project(project.name, project.description, current_user.id)
    except ValueError as e:
        raise HTTPException(status_code=500, detail=str(e))

# Listar proyectos de un usuario
@router.get("/", response_model=list[ProjectOut])
def list_projects(current_user= Depends(get_current_user), project_service: ProjectService = Depends(get_project_service)):
    try:
        return project_service.list_projects_by_owner(current_user.id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Obtener proyecto por id
@router.get("/{project_id}", response_model=ProjectOut)
def get_project(project_id: int, current_user= Depends(get_current_user), project_service: ProjectService = Depends(get_project_service)):
    try:
        return project_service.get_project(project_id, current_user.id)
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
   

# Borrar proyecto
@router.delete("/{project_id}")
def delete_project(project_id: int, current_user= Depends(get_current_user), project_service: ProjectService = Depends(get_project_service)):
    try:
        project_service.delete_project(project_id, current_user.id)
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))
    return {"detail": "Proyecto eliminado"}

# Actualizar proyecto
@router.put("/{project_id}", response_model=ProjectOut)
def update_project(project_id: int, project: ProjectCreate, current_user= Depends(get_current_user), project_service: ProjectService = Depends(get_project_service)):
    try:
        return project_service.update_project(project_id, project.name, project.description, current_user.id)
    except ProjectNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))