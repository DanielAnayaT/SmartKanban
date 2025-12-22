from abc import ABC, abstractmethod
from app.domain.models.list import List

class ListRepository(ABC):

    @abstractmethod
    def create(self, list_: List) -> List:
        pass

    @abstractmethod
    def get_by_id(self, list_id: int) -> List | None:
        pass

    @abstractmethod
    def list_by_board(self, board_id: int) -> list[List]:
        pass

    @abstractmethod
    def delete(self, list_id: int) -> None:
        pass

    @abstractmethod
    def update(self, list_: List) -> List:
        pass