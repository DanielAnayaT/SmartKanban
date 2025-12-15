from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.schemas.list import ListCreate, ListOut
from app.domain.services.list_service import ListService
from app.infrastructure.db.repositories.sqlalchemy_list_repository import SQLAlchemyListRepository
from app.infrastructure.db.repositories.sqlalchemy_board_repository import SQLAlchemyBoardRepository
from app.core.errors import ValueError, BoardNotFoundError, ListNotFoundError

router = APIRouter()
list_repo = SQLAlchemyListRepository()
board_repo = SQLAlchemyBoardRepository()
list_service = ListService(list_repo, board_repo)


@router.post("/", response_model=ListOut)
def create_list(list_: ListCreate):
    try:
        return list_service.create_list(list_.name, list_.board_id)
    except BoardNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.get("/board/{board_id}", response_model=list[ListOut])
def list_by_board(board_id: int):
    try:
        return list_service.list_by_board(board_id)
    except ListNotFoundError as e:
        raise HTTPException(status_code=404,detail=str(e))

@router.delete("/{list_id}", status_code=204)
def delete_list(list_id: int):
    try:
        list_service.delete_list(list_id)
    except ListNotFoundError as e:
        raise HTTPException(status_code=404,detail=str(e))
