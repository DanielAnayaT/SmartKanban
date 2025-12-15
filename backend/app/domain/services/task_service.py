from app.domain.models.task import Task
from app.domain.repositories.task_repository import TaskRepository
from app.domain.repositories.list_repository import ListRepository
from app.core.errors import ValueError, ListNotFoundError, TaskNotFoundError

class TaskService:

    def __init__(self, task_repo: TaskRepository, list_repo: ListRepository):
        self.task_repo = task_repo
        self.list_repo = list_repo

    def create_task(self, title: str, description: str | None, list_id: int) -> Task:
        list_ = self.list_repo.get_by_id(list_id)
        if not list_:
            raise ListNotFoundError(f"La lista con id {list_id} no existe")

        task = Task(
            id=None,
            title=title,
            description=description,
            list_id=list_id
        )
        return self.task_repo.create(task)

    def get_task(self, task_id: int) -> Task:
        task = self.task_repo.get_by_id(task_id)
        if not task:
            raise TaskNotFoundError(f"La tarea con id {task_id} no existe")
        return task

    def list_by_list(self, list_id: int) -> list[Task]:
        list_ = self.list_repo.get_by_id(list_id)
        if not list_:
            raise ListNotFoundError(f"La lista con id {list_id} no existe")

        return self.task_repo.list_by_list(list_id)

    def delete_task(self, task_id: int) -> None:
        task = self.task_repo.get_by_id(task_id)
        if not task:
            raise TaskNotFoundError(f"La tarea con id {task_id} no existe")

        self.task_repo.delete(task_id)
