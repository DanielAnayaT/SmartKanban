from fastapi import APIRouter, Depends, HTTPException, status
from app.schemas.board import BoardCreate, BoardOut
from app.domain.services.board_service import BoardService
from app.infrastructure.db.repositories.sqlalchemy_board_repository import SQLAlchemyBoardRepository
from sqlalchemy.orm import Session
from app.core.errors import BoardNotFoundError, ProjectNotFoundError
from app.infrastructure.db.repositories.sqlalchemy_project_repository import SQLAlchemyProjectRepository

router = APIRouter()
board_repo = SQLAlchemyBoardRepository()
project_repo = SQLAlchemyProjectRepository()
board_service = BoardService(board_repo, project_repo)



@router.post("/", response_model=BoardOut)
def create_board(board: BoardCreate):
    try:
        return board_service.create_board(board.name, board.project_id)
    except ProjectNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.get("/{board_id}", response_model=BoardOut)
def get_board(board_id: int):
    try:
        return board_service.get_board(board_id)
    except BoardNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.get("/project/{project_id}", response_model=list[BoardOut])
def list_boards(project_id: int):
    return board_service.list_boards_by_project(project_id)

@router.delete("/{board_id}")
def delete_board(board_id: int):
    board_service.delete_board(board_id)
    return {"detail": "Tablero eliminado"}
