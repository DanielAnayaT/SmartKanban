from app.domain.models.board import Board
from app.domain.repositories.board_repository import BoardRepository
from app.infrastructure.db.entities.board_entity import BoardEntity
from app.infrastructure.db.session import SessionLocal

class SQLAlchemyBoardRepository(BoardRepository):
    def __init__(self):
        self.db = SessionLocal()

    def create(self, board: Board) -> Board:
        entity = BoardEntity(
            name=board.name,
            project_id=board.project_id
        )
        self.db.add(entity)
        self.db.commit()
        self.db.refresh(entity)
        board.id = entity.id
        return board

    def get_by_id(self, board_id: int) -> Board | None:
        entity = self.db.query(BoardEntity).filter_by(id=board_id).first()
        if not entity:
            return None
        return Board(id=entity.id, name=entity.name, project_id=entity.project_id, created_at=entity.created_at, updated_at=entity.updated_at)

    def list_by_project(self, project_id: int) -> list[Board]:
        entities = self.db.query(BoardEntity).filter_by(project_id=project_id).all()
        return [Board(id=e.id, name=e.name, project_id=e.project_id, created_at=e.created_at, updated_at=e.updated_at) for e in entities]

    def delete(self, board_id: int):
        entity = self.db.query(BoardEntity).filter_by(id=board_id).first()
        if entity:
            self.db.delete(entity)
            self.db.commit()
