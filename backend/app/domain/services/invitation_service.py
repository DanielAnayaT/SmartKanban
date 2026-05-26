from app.infrastructure.db.repositories.sqlalchemy_project_invitation_repository import InvitationRepository
from app.infrastructure.db.repositories.sqlalchemy_project_member_repository import ProjectMemberRepository
from app.infrastructure.db.repositories.sqlalchemy_user_repository import UserRepository


class InvitationService:

    def __init__(self, invitation_repo: InvitationRepository, member_repo: ProjectMemberRepository, user_repo: UserRepository):
        self.invitation_repo = invitation_repo
        self.member_repo = member_repo
        self.user_repo = user_repo

    # =========================================
    # INVITE USER
    # =========================================
    def invite_user(self, project_id: int, email: str):

        # 1. comprobar que usuario existe
        user = self.user_repo.get_by_email(email)

        if not user:
            raise ValueError("User with this email does not exist")

        # 2. comprobar si ya es miembro
        already_member = self.member_repo.is_member(
            project_id,
            user.id
        )

        if already_member:
            raise ValueError("User is already member of this project")

        # 3. comprobar invitación existente
        existing = self.invitation_repo.get_pending_by_email(email)

        already_invited = any(
            inv.project_id == project_id
            for inv in existing
        )

        if already_invited:
            raise ValueError("User already invited")

        # 4. crear invitación
        return self.invitation_repo.create(
            project_id,
            email
        )

    # =========================================
    # GET USER INVITATIONS
    # =========================================
    def get_user_invitations(self, email: str):
        return self.invitation_repo.get_pending_by_email(email)

    # =========================================
    # ACCEPT INVITATION
    # =========================================
    def accept_invitation(
        self,
        invitation_id: int,
        user_id: int
    ):

        invitation = self.invitation_repo.get_by_id(
            invitation_id
        )

        if not invitation:
            raise ValueError("Invitation not found")

        if invitation.status != "pending":
            raise ValueError("Invitation already processed")

        # 1. marcar aceptada
        self.invitation_repo.update_status(
            invitation,
            "accepted"
        )

        # 2. crear membership
        self.member_repo.create(
            project_id=invitation.project_id,
            user_id=user_id,
            role="MEMBER"
        )

        return {"message": "Invitation accepted"}

    # =========================================
    # REJECT INVITATION
    # =========================================
    def reject_invitation(
        self,
        invitation_id: int
    ):

        invitation = self.invitation_repo.get_by_id(
            invitation_id
        )

        if not invitation:
            raise ValueError("Invitation not found")

        self.invitation_repo.update_status(
            invitation,
            "rejected"
        )

        return {"message": "Invitation rejected"}