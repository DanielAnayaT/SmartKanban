from abc import ABC, abstractmethod
from app.domain.models.board import Board

class BoardRepository(ABC):

    @abstractmethod
    def create(self, board: Board) -> Board:
        pass

    @abstractmethod
    def get_by_id(self, board_id: int) -> Board | None:
        pass

    @abstractmethod
    def list_by_project(self, project_id: int) -> list[Board]:
        pass

    @abstractmethod
    def delete(self, board_id: int):
        pass
