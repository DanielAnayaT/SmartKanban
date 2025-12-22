from abc import ABC, abstractmethod
from app.domain.models.project import Project

class ProjectRepository(ABC):

    @abstractmethod
    def create(self, project: Project) -> Project:
        pass

    @abstractmethod
    def get_by_id(self, project_id: int) -> Project | None:
        pass

    @abstractmethod
    def list_by_owner(self, owner_id: int) -> list[Project]:
        pass

    @abstractmethod
    def delete(self, project_id: int):
        pass

    @abstractmethod
    def update(self, project: Project) -> Project:
        pass