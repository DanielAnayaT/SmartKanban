from app.domain.models.project import Project
from app.domain.repositories.project_repository import ProjectRepository
from app.core.errors import ValueError, ProjectNotFoundError
from app.infrastructure.db.entities.project_member_entity import ProjectMemberEntity, ProjectRole
from app.domain.repositories.board_repository import BoardRepository
from app.infrastructure.db.entities.board_entity import BoardEntity

class ProjectService:
    def __init__(self, project_repo: ProjectRepository, board_repo: BoardRepository):
        self.project_repo = project_repo
        self.board_repo = board_repo

    def create_project(self, name: str, description: str | None, current_user_id: int) -> Project:
        project = Project(id=None, name=name, description=description, owner_id=current_user_id)
        project = self.project_repo.create(project)
        owner_member = ProjectMemberEntity(
            project_id=project.id,
            user_id=current_user_id,
            role=ProjectRole.OWNER
        )
        #self.db.add(owner_member)
        #self.db.commit()
        board = BoardEntity(
            name="Tablero por defecto",
            project_id=project.id
        )
        self.board_repo.create(board)

        return project

    def get_project(self, project_id: int, current_user_id: int) -> Project:
        project = self.project_repo.get_by_id(project_id)
        if not project:
            raise ProjectNotFoundError(f"Proyecto con id {project_id} no existe")
        
        return project

    def list_projects_by_owner(self, owner_id: int) -> list[Project]:
        return self.project_repo.list_by_owner(owner_id)

    def delete_project(self, project_id: int, current_user_id: int) -> None:
        project = self.project_repo.get_by_id(project_id)
        if not project:
            raise ProjectNotFoundError(f"Proyecto con id {project_id} no existe")
        
        #if project.owner_id != current_user_id:
            #raise ValueError("No tienes permiso para eliminar este proyecto")
        
        self.project_repo.delete(project_id)

    def update_project(self, project_id: int, name: str, description: str | None, current_user_id: int) -> Project:
        project = self.project_repo.get_by_id(project_id)
        if not project:
            raise ProjectNotFoundError(f"Proyecto con id {project_id} no existe")
        
        #if project.owner_id != current_user_id:
            #raise ValueError("No tienes permiso para actualizar este proyecto")
        project.name = name
        project.description = description
        return self.project_repo.update(project)
    
    def get_project_members(self, project_id: int):
        return self.project_repo.get_project_members(project_id)