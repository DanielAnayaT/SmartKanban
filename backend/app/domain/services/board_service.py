from app.domain.models.board import Board
from app.domain.repositories.board_repository import BoardRepository
from app.core.errors import ValueError, BoardNotFoundError, ProjectNotFoundError
from app.domain.repositories.project_repository import ProjectRepository

class BoardService:
    def __init__(self, board_repo: BoardRepository, project_repo: ProjectRepository):
        self.board_repo = board_repo
        self.project_repo = project_repo

    def create_board(self, name: str, project_id: int) -> Board:
        project = self.project_repo.get_by_id(project_id)
        if not project:
            raise ProjectNotFoundError(f"El proyecto con id {project_id} no existe")
        
        board = Board(id=None, name=name, project_id=project_id)
        return self.board_repo.create(board)

    def get_board(self, board_id: int) -> Board:
        board = self.board_repo.get_by_id(board_id)
        if not board:
            raise BoardNotFoundError(f"Tablero con id {board_id} no existe")
        return board

    def list_boards_by_project(self, project_id: int) -> list[Board]:
        return self.board_repo.list_by_project(project_id)

    def delete_board(self, board_id: int):
        self.board_repo.delete(board_id)
