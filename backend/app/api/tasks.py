from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.schemas.task import TaskCreate, TaskOut
from app.domain.services.task_service import TaskService
from app.infrastructure.db.repositories.sqlalchemy_task_repository import SQLAlchemyTaskRepository
from app.infrastructure.db.repositories.sqlalchemy_list_repository import SQLAlchemyListRepository
from app.core.errors import ValueError, ListNotFoundError, TaskNotFoundError

router = APIRouter()
task_repo = SQLAlchemyTaskRepository()
list_repo = SQLAlchemyListRepository()
task_service = TaskService(task_repo, list_repo)

@router.post("/", response_model=TaskOut)
def create_task(task: TaskCreate):
    try:
        return task_service.create_task(
            task.title,
            task.description,
            task.list_id
        )
    except ListNotFoundError as e:
        raise HTTPException(status_code=404,detail=str(e))

@router.get("/list/{list_id}", response_model=list[TaskOut])
def list_by_list(list_id: int):
    try:
        return task_service.list_by_list(list_id)
    except ListNotFoundError as e:
        raise HTTPException(status_code=404,detail=str(e))

@router.get("/{task_id}", response_model=TaskOut)
def get_task(task_id: int):
    try:
        return task_service.get_task(task_id)
    except TaskNotFoundError as e:
        raise HTTPException(status_code=404,detail=str(e))

@router.delete("/{task_id}", status_code=204)
def delete_task(task_id: int):
    try:
        task_service.delete_task(task_id)
    except TaskNotFoundError as e:
        raise HTTPException(status_code=404,detail=str(e))
