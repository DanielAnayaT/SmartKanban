from app.core.security import get_current_user
from app.infrastructure.db.repositories.sqlalchemy_project_repository import SQLAlchemyProjectRepository
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.schemas.list import ListCreate, ListOut
from app.domain.services.list_service import ListService
from app.infrastructure.db.repositories.sqlalchemy_list_repository import SQLAlchemyListRepository
from app.infrastructure.db.repositories.sqlalchemy_board_repository import SQLAlchemyBoardRepository
from app.core.errors import ValueError, BoardNotFoundError, ListNotFoundError
from app.infrastructure.db.session import get_db

router = APIRouter()

def get_list_service(db: Session = Depends(get_db)) -> ListService:
    list_repo = SQLAlchemyListRepository(db)
    board_repo = SQLAlchemyBoardRepository(db)
    project_repo = SQLAlchemyProjectRepository(db)
    return ListService(list_repo, board_repo, project_repo)



@router.post("/", response_model=ListOut)
def create_list(list_: ListCreate, current_user= Depends(get_current_user), list_service: ListService = Depends(get_list_service)):
    try:
        return list_service.create_list(list_.name, list_.board_id, current_user.id)
    except BoardNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.get("/board/{board_id}", response_model=list[ListOut])
def list_by_board(board_id: int, current_user= Depends(get_current_user), list_service: ListService = Depends(get_list_service)):
    try:
        return list_service.list_by_board(board_id, current_user.id)
    except ListNotFoundError as e:
        raise HTTPException(status_code=404,detail=str(e))

@router.delete("/{list_id}", status_code=204)
def delete_list(list_id: int, current_user= Depends(get_current_user), list_service: ListService = Depends(get_list_service)):
    try:
        list_service.delete_list(list_id, current_user.id)
    except ListNotFoundError as e:
        raise HTTPException(status_code=404,detail=str(e))
    
@router.put("/{list_id}", response_model=ListOut)
def update_list(list_id: int, list_: ListCreate, current_user= Depends(get_current_user), list_service: ListService = Depends(get_list_service)):
    try:
        return list_service.update_list(list_id, list_.name, current_user.id)
    except ListNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
