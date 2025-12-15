from datetime import datetime

class Board:
    def __init__(self, id: int | None, name: str, project_id: int, created_at: datetime | None = None, updated_at: datetime | None = None):
        self._id = id
        self._name = name
        self._project_id = project_id
        self._created_at = created_at or datetime.now()
        self._updated_at = updated_at or datetime.now()

    @property
    def id(self):
        return self._id

    @id.setter
    def id(self, value):
        self._id = value

    @property
    def name(self):
        return self._name

    @property
    def project_id(self):
        return self._project_id

    @property
    def created_at(self):
        return self._created_at

    @property
    def updated_at(self):
        return self._updated_at

    def update_timestamp(self):
        self._updated_at = datetime.now()
