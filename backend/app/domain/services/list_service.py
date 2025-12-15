from app.domain.models.list import List
from app.domain.repositories.list_repository import ListRepository
from app.domain.repositories.board_repository import BoardRepository
from app.core.errors import ValueError, BoardNotFoundError, ListNotFoundError

class ListService:

    def __init__(self, list_repo: ListRepository, board_repo: BoardRepository):
        self.list_repo = list_repo
        self.board_repo = board_repo

    def create_list(self, name: str, board_id: int) -> List:
        board = self.board_repo.get_by_id(board_id)
        if not board:
            raise BoardNotFoundError(f"El tablero con id {board_id} no existe")

        list_ = List(
            id=None,
            name=name,
            board_id=board_id
        )
        return self.list_repo.create(list_)

    def get_list(self, list_id: int) -> List:
        list_ = self.list_repo.get_by_id(list_id)
        if not list_:
            raise ListNotFoundError(f"La lista con id {list_id} no existe")
        return list_

    def list_by_board(self, board_id: int) -> list[List]:
        board = self.board_repo.get_by_id(board_id)
        if not board:
            raise BoardNotFoundError(f"El tablero con id {board_id} no existe")

        return self.list_repo.list_by_board(board_id)

    def delete_list(self, list_id: int) -> None:
        list_ = self.list_repo.get_by_id(list_id)
        if not list_:
            raise ListNotFoundError(f"La lista con id {list_id} no existe")

        self.list_repo.delete(list_id)
