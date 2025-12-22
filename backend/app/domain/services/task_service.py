from app.domain.models.task import Task
from app.domain.repositories.task_repository import TaskRepository
from app.domain.repositories.list_repository import ListRepository
from app.core.errors import ValueError, ListNotFoundError, TaskNotFoundError
from app.domain.repositories.board_repository import BoardRepository
from app.domain.repositories.project_repository import ProjectRepository

class TaskService:

    def __init__(self, task_repo: TaskRepository, list_repo: ListRepository, board_repo: BoardRepository, project_repo: ProjectRepository):
        self.task_repo = task_repo
        self.list_repo = list_repo
        self.board_repo = board_repo
        self.project_repo = project_repo

    def create_task(self, title: str, description: str | None, list_id: int, current_user_id: int) -> Task:
        list_ = self.list_repo.get_by_id(list_id)
        if not list_:
            raise ListNotFoundError(f"La lista con id {list_id} no existe")

        board = self.board_repo.get_by_id(list_.board_id)
        if not board:
            raise ValueError(f"El tablero asociado a la lista con id {list_.id} no existe")
        project = self.project_repo.get_by_id(board.project_id)
        if not project:
            raise ValueError(f"El proyecto asociado al tablero con id {board.id} no existe")
        if project.owner_id != current_user_id:
            raise ValueError("No tienes permiso para crear tareas en esta lista")

        task = Task(
            id=None,
            title=title,
            description=description,
            list_id=list_id
        )
        return self.task_repo.create(task)

    def get_task(self, task_id: int, current_user_id: int) -> Task:
        task = self.task_repo.get_by_id(task_id)
        if not task:
            raise TaskNotFoundError(f"La tarea con id {task_id} no existe")

        list_ = self.list_repo.get_by_id(task.list_id)
        if not list_:
            raise ListNotFoundError(f"La lista con id {list_.id} no existe")

        board = self.board_repo.get_by_id(list_.board_id)
        if not board:
            raise ValueError(f"El tablero asociado a la lista con id {list_.id} no existe")
        project = self.project_repo.get_by_id(board.project_id)
        if not project:
            raise ValueError(f"El proyecto asociado al tablero con id {board.id} no existe")
        if project.owner_id != current_user_id:
            raise ValueError("No tienes permiso para acceder a esta tarea")

        return task

    def list_by_list(self, list_id: int, current_user_id: int) -> list[Task]:
        list_ = self.list_repo.get_by_id(list_id)
        if not list_:
            raise ListNotFoundError(f"La lista con id {list_id} no existe")

        board = self.board_repo.get_by_id(list_.board_id)
        if not board:
            raise ValueError(f"El tablero asociado a la lista con id {list_.id} no existe")
        project = self.project_repo.get_by_id(board.project_id)
        if not project:
            raise ValueError(f"El proyecto asociado al tablero con id {board.id} no existe")
        if project.owner_id != current_user_id:
            raise ValueError("No tienes permiso para ver las tareas de esta lista")

        return self.task_repo.list_by_list(list_id)

    def delete_task(self, task_id: int, current_user_id: int) -> None:
        task = self.task_repo.get_by_id(task_id)
        if not task:
            raise TaskNotFoundError(f"La tarea con id {task_id} no existe")

        list_ = self.list_repo.get_by_id(task.list_id)
        if not list_:
            raise ListNotFoundError(f"La lista con id {list_.id} no existe")

        board = self.board_repo.get_by_id(list_.board_id)
        if not board:
            raise ValueError(f"El tablero asociado a la lista con id {list_.id} no existe")
        project = self.project_repo.get_by_id(board.project_id)
        if not project:
            raise ValueError(f"El proyecto asociado al tablero con id {board.id} no existe")
        if project.owner_id != current_user_id:
            raise ValueError("No tienes permiso para eliminar esta tarea")

        self.task_repo.delete(task_id)

    def update_task(self, task_id: int, title: str, description: str | None, current_user_id: int) -> Task:
        task = self.task_repo.get_by_id(task_id)
        if not task:
            raise TaskNotFoundError(f"La tarea con id {task_id} no existe")
        list_ = self.list_repo.get_by_id(task.list_id)
        if not list_:
            raise ListNotFoundError(f"La lista con id {list_.id} no existe")
        board = self.board_repo.get_by_id(list_.board_id)
        if not board:
            raise ValueError(f"El tablero asociado a la lista con id {list_.id} no existe")
        project = self.project_repo.get_by_id(board.project_id)
        if not project:
            raise ValueError(f"El proyecto asociado al tablero con id {board.id} no existe")
        if project.owner_id != current_user_id:
            raise ValueError("No tienes permiso para actualizar esta tarea")

        task.title = title
        task.description = description
        return self.task_repo.update(task)
