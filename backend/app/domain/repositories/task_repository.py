from abc import ABC, abstractmethod
from app.domain.models.task import Task

class TaskRepository(ABC):

    @abstractmethod
    def create(self, task: Task) -> Task:
        pass

    @abstractmethod
    def get_by_id(self, task_id: int) -> Task | None:
        pass

    @abstractmethod
    def list_by_list(self, list_id: int) -> list[Task]:
        pass

    @abstractmethod
    def delete(self, task_id: int) -> None:
        pass

    @abstractmethod
    def update(self, task: Task) -> Task:
        pass

    @abstractmethod
    def reorder_tasks(self, items):
        pass

    @abstractmethod
    def save(self, task: Task) -> Task:
        pass