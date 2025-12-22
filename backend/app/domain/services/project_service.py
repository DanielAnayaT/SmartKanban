from app.domain.models.project import Project
from app.domain.repositories.project_repository import ProjectRepository
from app.core.errors import ValueError, ProjectNotFoundError

class ProjectService:
    def __init__(self, project_repo: ProjectRepository):
        self.project_repo = project_repo

    def create_project(self, name: str, description: str | None, owner_id: int, current_user_id: int) -> Project:
        if owner_id != current_user_id:
            raise ValueError("No tienes permiso para crear proyectos para otro usuario")

        project = Project(id=None, name=name, description=description, owner_id=current_user_id)
        return self.project_repo.create(project)

    def get_project(self, project_id: int, current_user_id: int) -> Project:
        project = self.project_repo.get_by_id(project_id)
        if not project:
            raise ProjectNotFoundError(f"Proyecto con id {project_id} no existe")
        if project.owner_id != current_user_id:
            raise ValueError("No tienes permiso para ver este proyecto")
        return project

    def list_projects_by_owner(self, owner_id: int, current_user_id: int) -> list[Project]:
        if owner_id != current_user_id:
            raise ValueError("No tienes permiso para ver proyectos de otro usuario")
        return self.project_repo.list_by_owner(owner_id)

    def delete_project(self, project_id: int, current_user_id: int) -> None:
        project = self.project_repo.get_by_id(project_id)
        if not project:
            raise ProjectNotFoundError(f"Proyecto con id {project_id} no existe")
        
        if project.owner_id != current_user_id:
            raise ValueError("No tienes permiso para eliminar este proyecto")
        
        self.project_repo.delete(project_id)

    def update_project(self, project_id: int, name: str, description: str | None, current_user_id: int) -> Project:
        project = self.project_repo.get_by_id(project_id)
        if not project:
            raise ProjectNotFoundError(f"Proyecto con id {project_id} no existe")
        
        if project.owner_id != current_user_id:
            raise ValueError("No tienes permiso para actualizar este proyecto")
        project.name = name
        project.description = description
        return self.project_repo.update(project)