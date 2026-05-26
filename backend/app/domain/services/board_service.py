from app.domain.models.board import Board
from app.domain.repositories.board_repository import BoardRepository
from app.core.errors import ValueError, BoardNotFoundError, ProjectNotFoundError
from app.domain.repositories.project_repository import ProjectRepository

class BoardService:
    def __init__(self, board_repo: BoardRepository, project_repo: ProjectRepository):
        self.board_repo = board_repo
        self.project_repo = project_repo

    def create_board(self, name: str, project_id: int, current_user_id: int) -> Board:
        project = self.project_repo.get_by_id(project_id)
        if not project:
            raise ProjectNotFoundError(f"El proyecto con id {project_id} no existe")
        #if project.owner_id != current_user_id:
            #raise ValueError("No tienes permiso para agregar tableros a este proyecto")
        
        board = Board(id=None, name=name, project_id=project_id)
        return self.board_repo.create(board)

    def get_board(self, board_id: int, current_user_id: int) -> Board:
        board = self.board_repo.get_by_id(board_id)
        if not board:
            raise BoardNotFoundError(f"Tablero con id {board_id} no existe")

        project = self.project_repo.get_by_id(board.project_id)
        if not project:
            raise ProjectNotFoundError(f"El proyecto con id {board.project_id} no existe")
        #if project.owner_id != current_user_id:
            #raise ValueError("No tienes permiso para acceder a este tablero")

        return board

    def list_boards_by_project(self, project_id: int, current_user_id: int) -> list[Board]:
        project = self.project_repo.get_by_id(project_id)
        if not project:
            raise ProjectNotFoundError(f"El proyecto con id {project_id} no existe")
        #if project.owner_id != current_user_id:
            #raise ValueError("No tienes permiso para ver los tableros de este proyecto")
        return self.board_repo.list_by_project(project_id)

    def delete_board(self, board_id: int, current_user_id: int):
        board = self.board_repo.get_by_id(board_id)
        if not board:
            raise BoardNotFoundError(f"Tablero con id {board_id} no existe")

        project = self.project_repo.get_by_id(board.project_id)
        if not project:
            raise ProjectNotFoundError(f"El proyecto con id {board.project_id} no existe")
        #if project.owner_id != current_user_id:
            #raise ValueError("No tienes permiso para eliminar este tablero")

        self.board_repo.delete(board_id)

    def update_board(self, board_id: int, name: str, current_user_id: int) -> Board:
        board = self.board_repo.get_by_id(board_id)
        if not board:
            raise BoardNotFoundError(f"Tablero con id {board_id} no existe")
        project = self.project_repo.get_by_id(board.project_id)
        if not project:
            raise ProjectNotFoundError(f"El proyecto con id {board.project_id} no existe")
        #if project.owner_id != current_user_id:
            #raise ValueError("No tienes permiso para actualizar este tablero")
        board.name = name
        return self.board_repo.update(board)