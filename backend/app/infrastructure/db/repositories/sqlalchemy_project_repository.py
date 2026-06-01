from app.domain.models.project import Project
from app.domain.repositories.project_repository import ProjectRepository
from app.infrastructure.db.entities.project_entity import ProjectEntity
from sqlalchemy.orm import Session
from app.infrastructure.db.entities.project_member_entity import ProjectMemberEntity
from app.infrastructure.db.entities.user_entity import UserEntity

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
        self.db.flush()
        project.id = entity.id
        self.db.commit()
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

    def list_by_owner(self, user_id: int) -> list[Project]:
        entities = (
            self.db.query(ProjectEntity)
            .outerjoin(ProjectMemberEntity, ProjectMemberEntity.project_id == ProjectEntity.id)
            .filter(
                (ProjectEntity.owner_id == user_id) |
                (ProjectMemberEntity.user_id == user_id)
        )
            .distinct()
            .all()
        )

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


    def get_project_members(self, project_id: int):

        project = (
            self.db.query(ProjectEntity)
            .filter_by(id=project_id)
            .first()
        )

        if not project:
            return []

        members = (
            self.db.query(UserEntity)
            .join(
                ProjectMemberEntity,
                UserEntity.id == ProjectMemberEntity.user_id
            )
            .filter(
                ProjectMemberEntity.project_id == project_id
            )
            .all()
        )

        result = []

        # owner primero
        owner = (
            self.db.query(UserEntity)
            .filter_by(id=project.owner_id)
        .   first()
        )

        if owner:
            result.append({
                "id": owner.id,
                "username": owner.username
            })

        # miembros invitados
        for member in members:

            # evitar duplicar owner
            if owner and member.id == owner.id:
                continue

            result.append({
                "id": member.id,
                "username": member.username
            })

        return result