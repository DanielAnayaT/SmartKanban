from app.domain.models.project import Project
from app.domain.repositories.project_repository import ProjectRepository
from app.infrastructure.db.entities.project_entity import ProjectEntity
from sqlalchemy.orm import Session

class SQLAlchemyProjectRepository(ProjectRepository):
    def __init__(self, db: Session):
        self.db = db

    def create(self, project: Project) -> Project:
        entity = ProjectEntity(
            name=project.name,
            description=project.description,
            owner_id=project.owner_id
        )
        self.db.add(entity)
        self.db.commit()
        self.db.refresh(entity)
        project.id = entity.id
        return project

    def get_by_id(self, project_id: int) -> Project | None:
        entity = self.db.query(ProjectEntity).filter_by(id=project_id).first()
        if not entity:
            return None
        return Project(
            id=entity.id,
            name=entity.name,
            description=entity.description,
            owner_id=entity.owner_id,
            created_at=entity.created_at,
            updated_at=entity.updated_at
        )

    def list_by_owner(self, owner_id: int) -> list[Project]:
        entities = self.db.query(ProjectEntity).filter_by(owner_id=owner_id).all()
        return [
            Project(
                id=e.id,
                name=e.name,
                description=e.description,
                owner_id=e.owner_id,
                created_at=e.created_at,
                updated_at=e.updated_at
            ) for e in entities
        ]

    def delete(self, project_id: int):
        entity = self.db.query(ProjectEntity).filter_by(id=project_id).first()
        if entity:
            self.db.delete(entity)
            self.db.commit()

    def update(self, project: Project) -> Project:
        entity = self.db.query(ProjectEntity).filter_by(id=project.id).first()
        if not entity:
            return project  
        entity.name = project.name
        entity.description = project.description
        self.db.commit()
        self.db.refresh(entity)
        return Project(
            id=entity.id,
            name=entity.name,
            description=entity.description,
            owner_id=entity.owner_id,
            created_at=entity.created_at,
            updated_at=entity.updated_at
        )
