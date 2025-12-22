from datetime import datetime

class Project:
    def __init__(self, id: int | None, name: str, description: str | None, owner_id: int, created_at: datetime | None = None, updated_at: datetime | None = None):
        self._id = id
        self._name = name
        self._description = description
        self._owner_id = owner_id
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
    
    @name.setter
    def name(self, value):
        self._name = value

    @property
    def description(self):
        return self._description
    
    @description.setter
    def description(self, value):
        self._description = value

    @property
    def owner_id(self):
        return self._owner_id
    
    @owner_id.setter
    def owner_id(self, value):
        self._owner_id = value

    @property
    def created_at(self):
        return self._created_at

    @property
    def updated_at(self):
        return self._updated_at

    def update_timestamp(self):
        self._updated_at = datetime.now()
