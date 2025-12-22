from sqlalchemy.orm import Session
from app.domain.models.list import List
from app.domain.repositories.list_repository import ListRepository
from app.infrastructure.db.entities.list_entity import ListORM


class SQLAlchemyListRepository(ListRepository):

    def __init__(self, db: Session):
        self.db = db

    def create(self, list_: List) -> List:
        orm = ListORM(name=list_.name,board_id=list_.board_id)
        self.db.add(orm)
        self.db.commit()
        self.db.refresh(orm)

        return List(
            id=orm.id,
            name=orm.name,
            board_id=orm.board_id
        )

    def get_by_id(self, list_id: int) -> List | None:
        orm = self.db.query(ListORM).filter(ListORM.id == list_id).first()
        if not orm:
            return None
        return List(
            id=orm.id,
            name=orm.name,
            board_id=orm.board_id
        )

    def list_by_board(self, board_id: int) -> list[List]:
        orms = self.db.query(ListORM).filter(ListORM.board_id == board_id).all()
        return [
            List(id=o.id, name=o.name, board_id=o.board_id)
            for o in orms
        ]

    def delete(self, list_id: int) -> None:
        orm = self.db.query(ListORM).filter(ListORM.id == list_id).first()
        if orm:
            self.db.delete(orm)
            self.db.commit()

    def update(self, list_: List) -> List:
        orm = self.db.query(ListORM).filter(ListORM.id == list_.id).first()
        if not orm:
            return list_  
        orm.name = list_.name
        self.db.commit()
        return list_