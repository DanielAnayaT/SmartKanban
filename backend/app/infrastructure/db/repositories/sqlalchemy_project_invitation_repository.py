from sqlalchemy.orm import Session

from app.infrastructure.db.entities.project_invitation_entity import ProjectInvitationEntity


class InvitationRepository:

    def __init__(self, db: Session):
        self.db = db

    # =========================================
    # CREATE INVITATION
    # =========================================
    def create(
        self,
        project_id: int,
        email: str
    ):
        invitation = ProjectInvitationEntity(
            project_id=project_id,
            email=email,
            status="pending"
        )

        self.db.add(invitation)
        self.db.commit()
        self.db.refresh(invitation)

        return invitation

    # =========================================
    # GET INVITATION BY ID
    # =========================================
    def get_by_id(self, invitation_id: int):
        return self.db.query(ProjectInvitationEntity).filter(
            ProjectInvitationEntity.id == invitation_id
        ).first()

    # =========================================
    # GET PENDING INVITATIONS BY EMAIL
    # =========================================
    def get_pending_by_email(self, email: str):
        return self.db.query(ProjectInvitationEntity).filter(
            ProjectInvitationEntity.email == email,
            ProjectInvitationEntity.status == "pending"
        ).all()

    # =========================================
    # UPDATE STATUS
    # =========================================
    def update_status(
        self,
        invitation: ProjectInvitationEntity,
        status: str
    ):
        invitation.status = status

        self.db.commit()
        self.db.refresh(invitation)

        return invitation

    # =========================================
    # DELETE INVITATION
    # =========================================
    def delete(self, invitation: ProjectInvitationEntity):
        self.db.delete(invitation)
        self.db.commit()