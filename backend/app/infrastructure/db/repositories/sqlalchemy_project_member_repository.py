from sqlalchemy.orm import Session
from app.infrastructure.db.entities.project_member_entity import ProjectMemberEntity, ProjectRole

class ProjectMemberRepository:

    def __init__(self, db: Session):
        self.db = db

    # =========================================
    # CREATE MEMBER
    # =========================================
    def create(
        self,
        project_id: int,
        user_id: int,
        role: str = "MEMBER"
    ):
        member = ProjectMemberEntity(
            project_id=project_id,
            user_id=user_id,
            role=role
        )

        print("MEMBER CREATED:", member.id)

        self.db.add(member)
        self.db.commit()
        self.db.refresh(member)

        return member

    # =========================================
    # CHECK IF USER IS MEMBER
    # =========================================
    def is_member(
        self,
        project_id: int,
        user_id: int
    ):
        return self.db.query(ProjectMemberEntity).filter(
            ProjectMemberEntity.project_id == project_id,
            ProjectMemberEntity.user_id == user_id
        ).first()

    # =========================================
    # GET ALL MEMBERS OF PROJECT
    # =========================================
    def get_project_members(self, project_id: int):
        return self.db.query(ProjectMemberEntity).filter(
            ProjectMemberEntity.project_id == project_id
        ).all()

    # =========================================
    # GET ALL PROJECTS OF USER
    # =========================================
    def get_user_projects(self, user_id: int):
        return self.db.query(ProjectMemberEntity).filter(
            ProjectMemberEntity.user_id == user_id
        ).all()

    # =========================================
    # REMOVE MEMBER
    # =========================================
    def remove_member(
        self,
        project_id: int,
        user_id: int
    ):
        member = self.db.query(ProjectMemberEntity).filter(
            ProjectMemberEntity.project_id == project_id,
            ProjectMemberEntity.user_id == user_id
        ).first()

        if not member:
            return None

        self.db.delete(member)
        self.db.commit()

        return True

    # =========================================
    # UPDATE ROLE
    # =========================================
    def update_role(
        self,
        project_id: int,
        user_id: int,
        role: str
    ):
        member = self.db.query(ProjectMemberEntity).filter(
            ProjectMemberEntity.project_id == project_id,
            ProjectMemberEntity.user_id == user_id
        ).first()

        if not member:
            return None

        member.role = role

        self.db.commit()
        self.db.refresh(member)

        return member