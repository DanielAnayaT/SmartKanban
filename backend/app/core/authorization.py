from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.infrastructure.db.session import get_db
from app.core.security import get_current_user
from app.infrastructure.db.entities.project_member_entity import (
    ProjectMemberEntity,
    ProjectRole,
)

# Devuelve la membresía o lanza 403
def get_project_membership(
    project_id: int,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user),
) -> ProjectMemberEntity:
    membership = (
        db.query(ProjectMemberEntity)
        .filter(
            ProjectMemberEntity.project_id == project_id,
            ProjectMemberEntity.user_id == current_user.id,
        )
        .first()
    )

    if not membership:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No tienes acceso a este proyecto",
        )

    return membership


# Verifica que sea OWNER
def require_project_owner(
    membership: ProjectMemberEntity = Depends(get_project_membership),
) -> ProjectMemberEntity:
    if membership.role != ProjectRole.OWNER:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Solo el owner puede realizar esta acción",
        )

    return membership
