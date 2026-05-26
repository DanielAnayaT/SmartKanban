from fastapi import APIRouter, Depends, HTTPException

from app.domain.services.invitation_service import InvitationService
from app.core.security import get_current_user
from app.infrastructure.db.session import get_db
from sqlalchemy.orm import Session
from app.infrastructure.db.repositories.sqlalchemy_project_invitation_repository import InvitationRepository
from app.infrastructure.db.repositories.sqlalchemy_project_member_repository import ProjectMemberRepository
from app.infrastructure.db.repositories.sqlalchemy_user_repository import SQLAlchemyUserRepository
router = APIRouter()

def get_invitation_service(db: Session = Depends(get_db)) -> InvitationService:
    invitation_repo = InvitationRepository(db)
    project_member_repo = ProjectMemberRepository(db)
    user_repo = SQLAlchemyUserRepository(db)
    return InvitationService(invitation_repo, project_member_repo, user_repo)
# =========================================
# INVITE USER
# =========================================
@router.post("/")
def invite_user(
    data: dict,
    current_user=Depends(get_current_user),
    invitation_service: InvitationService = Depends(get_invitation_service)
):
    try:

        project_id = data.get("project_id")
        email = data.get("email")

        if not project_id or not email:
            raise HTTPException(
                status_code=400,
                detail="project_id and email are required"
            )

        return invitation_service.invite_user(
            project_id=project_id,
            email=email
        )

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


# =========================================
# GET MY INVITATIONS
# =========================================
@router.get("/my")
def get_my_invitations(
    current_user=Depends(get_current_user),
    invitation_service: InvitationService = Depends(get_invitation_service)
):
    return invitation_service.get_user_invitations(
        current_user.email
    )


# =========================================
# ACCEPT INVITATION
# =========================================
@router.patch("/{invitation_id}/accept")
def accept_invitation(
    invitation_id: int,
    current_user=Depends(get_current_user),
    invitation_service: InvitationService = Depends(get_invitation_service)
):
    try:

        return invitation_service.accept_invitation(
            invitation_id=invitation_id,
            user_id=current_user.id
        )

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )


# =========================================
# REJECT INVITATION
# =========================================
@router.patch("/{invitation_id}/reject")
def reject_invitation(
    invitation_id: int,
    current_user=Depends(get_current_user),
    invitation_service: InvitationService = Depends(get_invitation_service)
):
    try:

        return invitation_service.reject_invitation(
            invitation_id=invitation_id
        )

    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )