from app.domain.models.project import Project
from app.domain.repositories.project_repository import ProjectRepository
from app.core.errors import ValueError, ProjectNotFoundError

class ProjectService:
    def __init__(self, project_repo: ProjectRepository):
        self.project_repo = project_repo

    def create_project(self, name: str, description: str | None, owner_id: int) -> Project:
        project = Project(id=None, name=name, description=description, owner_id=owner_id)
        return self.project_repo.create(project)

    def get_project(self, project_id: int) -> Project:
        project = self.project_repo.get_by_id(project_id)
        if not project:
            raise ProjectNotFoundError(f"Proyecto con id {project_id} no existe")
        return project

    def list_projects_by_owner(self, owner_id: int) -> list[Project]:
        return self.project_repo.list_by_owner(owner_id)

    def delete_project(self, project_id: int):
        self.project_repo.delete(project_id)
