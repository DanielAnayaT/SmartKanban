from app.core.security import get_current_user
from app.infrastructure.db.session import get_db
from fastapi import APIRouter, Depends, HTTPException, status
from app.schemas.board import BoardCreate, BoardOut
from app.domain.services.board_service import BoardService
from app.infrastructure.db.repositories.sqlalchemy_board_repository import SQLAlchemyBoardRepository
from sqlalchemy.orm import Session
from app.core.errors import BoardNotFoundError, ProjectNotFoundError
from app.infrastructure.db.repositories.sqlalchemy_project_repository import SQLAlchemyProjectRepository

router = APIRouter()

def get_board_service(db: Session = Depends(get_db)) -> BoardService:
    repo = SQLAlchemyBoardRepository(db)
    project_repo = SQLAlchemyProjectRepository(db)
    return BoardService(repo, project_repo)


@router.post("/", response_model=BoardOut)
def create_board(board: BoardCreate, current_user= Depends(get_current_user), board_service: BoardService = Depends(get_board_service)):
    try:
        return board_service.create_board(board.name, board.project_id, current_user.id)
    except ProjectNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.get("/{board_id}", response_model=BoardOut)
def get_board(board_id: int, current_user= Depends(get_current_user), board_service: BoardService = Depends(get_board_service)):
    try:
        return board_service.get_board(board_id, current_user.id)
    except BoardNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.get("/project/{project_id}", response_model=list[BoardOut])
def list_boards(project_id: int, current_user= Depends(get_current_user), board_service: BoardService = Depends(get_board_service)):
    try:
        return board_service.list_boards_by_project(project_id, current_user.id)
    except ProjectNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.delete("/{board_id}")
def delete_board(board_id: int, current_user= Depends(get_current_user), board_service: BoardService = Depends(get_board_service)):
    try:
        board_service.delete_board(board_id, current_user.id)
    except BoardNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
    return {"detail": "Tablero eliminado"}

@router.put("/{board_id}", response_model=BoardOut)
def update_board(board_id: int, board: BoardCreate, current_user= Depends(get_current_user), board_service: BoardService = Depends(get_board_service)):
    try:
        return board_service.update_board(board_id, board.name, current_user.id)
    except BoardNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
