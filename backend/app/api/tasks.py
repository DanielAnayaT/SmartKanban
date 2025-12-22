from app.core.security import get_current_user
from app.infrastructure.db.repositories.sqlalchemy_board_repository import SQLAlchemyBoardRepository
from app.infrastructure.db.repositories.sqlalchemy_project_repository import SQLAlchemyProjectRepository
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.schemas.task import TaskCreate, TaskOut
from app.domain.services.task_service import TaskService
from app.infrastructure.db.repositories.sqlalchemy_task_repository import SQLAlchemyTaskRepository
from app.infrastructure.db.repositories.sqlalchemy_list_repository import SQLAlchemyListRepository
from app.core.errors import ValueError, ListNotFoundError, TaskNotFoundError
from app.infrastructure.db.session import get_db

router = APIRouter()

def get_task_service(db: Session = Depends(get_db)) -> TaskService:
    task_repo = SQLAlchemyTaskRepository(db)
    list_repo = SQLAlchemyListRepository(db)
    board_repo = SQLAlchemyBoardRepository(db)
    project_repo = SQLAlchemyProjectRepository(db)
    return TaskService(task_repo, list_repo, board_repo, project_repo)

@router.post("/", response_model=TaskOut)
def create_task(task: TaskCreate, current_user= Depends(get_current_user), task_service: TaskService = Depends(get_task_service)):
    try:
        return task_service.create_task(
            task.title,
            task.description,
            task.list_id,
            current_user.id
        )
    except ListNotFoundError as e:
        raise HTTPException(status_code=404,detail=str(e))

@router.get("/list/{list_id}", response_model=list[TaskOut])
def list_by_list(list_id: int, current_user= Depends(get_current_user), task_service: TaskService = Depends(get_task_service)):
    try:
        return task_service.list_by_list(list_id, current_user.id)
    except ListNotFoundError as e:
        raise HTTPException(status_code=404,detail=str(e))

@router.get("/{task_id}", response_model=TaskOut)
def get_task(task_id: int, current_user= Depends(get_current_user), task_service: TaskService = Depends(get_task_service)):
    try:
        return task_service.get_task(task_id, current_user.id)
    except TaskNotFoundError as e:
        raise HTTPException(status_code=404,detail=str(e))

@router.delete("/{task_id}", status_code=204)
def delete_task(task_id: int, current_user= Depends(get_current_user), task_service: TaskService = Depends(get_task_service)):
    try:
        task_service.delete_task(task_id, current_user.id)
    except TaskNotFoundError as e:
        raise HTTPException(status_code=404,detail=str(e))
    
@router.put("/{task_id}", response_model=TaskOut)
def update_task(task_id: int, task: TaskCreate, current_user= Depends(get_current_user), task_service: TaskService = Depends(get_task_service)):
    try:
        return task_service.update_task(task_id, task.title, task.description, current_user.id)
    except TaskNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
