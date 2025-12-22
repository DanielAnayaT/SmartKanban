from sqlalchemy.orm import Session
from app.domain.models.task import Task
from app.domain.repositories.task_repository import TaskRepository
from app.infrastructure.db.entities.task_entity import TaskORM


class SQLAlchemyTaskRepository(TaskRepository):

    def __init__(self, db: Session):
        self.db = db

    def create(self, task: Task) -> Task:
        orm = TaskORM(title=task.title, description=task.description, list_id=task.list_id)
        self.db.add(orm)
        self.db.commit()
        self.db.refresh(orm)

        return Task(
            id=orm.id,
            title=orm.title,
            description=orm.description,
            list_id=orm.list_id
        )

    def get_by_id(self, task_id: int) -> Task | None:
        orm = self.db.query(TaskORM).filter(TaskORM.id == task_id).first()
        if not orm:
            return None
        return Task(
            id=orm.id,
            title=orm.title,
            description=orm.description,
            list_id=orm.list_id
        )

    def list_by_list(self, list_id: int) -> list[Task]:
        orms = self.db.query(TaskORM).filter(TaskORM.list_id == list_id).all()
        return [
            Task(
                id=o.id,
                title=o.title,
                description=o.description,
                list_id=o.list_id
            )
            for o in orms
        ]

    def delete(self, task_id: int) -> None:
        orm = self.db.query(TaskORM).filter(TaskORM.id == task_id).first()
        if orm:
            self.db.delete(orm)
            self.db.commit()

    def update(self, task: Task) -> Task:
        orm = self.db.query(TaskORM).filter(TaskORM.id == task.id).first()
        if not orm:
            return task  
        orm.title = task.title
        orm.description = task.description
        self.db.commit()
        return task
