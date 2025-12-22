from app.domain.models.list import List
from app.domain.repositories.list_repository import ListRepository
from app.domain.repositories.board_repository import BoardRepository
from app.domain.repositories.project_repository import ProjectRepository
from app.core.errors import ValueError, BoardNotFoundError, ListNotFoundError

class ListService:

    def __init__(self, list_repo: ListRepository, board_repo: BoardRepository, project_repo: ProjectRepository):
        self.list_repo = list_repo
        self.board_repo = board_repo
        self.project_repo = project_repo

    def create_list(self, name: str, board_id: int, current_user_id: int) -> List:
        board = self.board_repo.get_by_id(board_id)
        if not board:
            raise BoardNotFoundError(f"El tablero con id {board_id} no existe")
        
        project = self.project_repo.get_by_id(board.project_id)
        if not project:
            raise ValueError(f"El proyecto asociado al tablero con id {board_id} no existe")
        if project.owner_id != current_user_id:
            raise ValueError("No tienes permiso para agregar listas a este tablero")

        list_ = List(
            id=None,
            name=name,
            board_id=board_id
        )
        return self.list_repo.create(list_)

    def get_list(self, list_id: int, current_user_id: int) -> List:
        list_ = self.list_repo.get_by_id(list_id)
        if not list_:
            raise ListNotFoundError(f"La lista con id {list_id} no existe")

        board = self.board_repo.get_by_id(list_.board_id)
        if not board:
            raise BoardNotFoundError(f"El tablero con id {list_.board_id} no existe")
        project = self.project_repo.get_by_id(board.project_id)
        if not project:
            raise ValueError(f"El proyecto asociado al tablero con id {board.id} no existe")
        if project.owner_id != current_user_id:
            raise ValueError("No tienes permiso para acceder a esta lista")

        return list_

    def list_by_board(self, board_id: int, current_user_id: int) -> list[List]:
        board = self.board_repo.get_by_id(board_id)
        if not board:
            raise BoardNotFoundError(f"El tablero con id {board_id} no existe")

        project = self.project_repo.get_by_id(board.project_id)
        if not project:
            raise ValueError(f"El proyecto asociado al tablero con id {board_id} no existe")
        if project.owner_id != current_user_id:
            raise ValueError("No tienes permiso para ver las listas de este tablero")

        return self.list_repo.list_by_board(board_id)

    def delete_list(self, list_id: int, current_user_id: int) -> None:
        list_ = self.list_repo.get_by_id(list_id)
        if not list_:
            raise ListNotFoundError(f"La lista con id {list_id} no existe")

        board = self.board_repo.get_by_id(list_.board_id)
        if not board:
            raise BoardNotFoundError(f"El tablero con id {list_.board_id} no existe")
        project = self.project_repo.get_by_id(board.project_id)
        if not project:
            raise ValueError(f"El proyecto asociado al tablero con id {board.id} no existe")
        if project.owner_id != current_user_id:
            raise ValueError("No tienes permiso para eliminar esta lista")

        self.list_repo.delete(list_id)

    def update_list(self, list_id: int, name: str, current_user_id: int) -> List:
        list_ = self.list_repo.get_by_id(list_id)
        if not list_:
            raise ListNotFoundError(f"La lista con id {list_id} no existe")

        board = self.board_repo.get_by_id(list_.board_id)
        if not board:
            raise BoardNotFoundError(f"El tablero con id {list_.board_id} no existe")
        project = self.project_repo.get_by_id(board.project_id)
        if not project:
            raise ValueError(f"El proyecto asociado al tablero con id {board.id} no existe")
        if project.owner_id != current_user_id:
            raise ValueError("No tienes permiso para actualizar esta lista")

        list_.name = name
        return self.list_repo.update(list_)