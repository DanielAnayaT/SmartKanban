class Task:
    def __init__(self, id: int | None, title: str, description: str | None, list_id: int, position: int = 0):
        self.id = id
        self.title = title
        self.description = description
        self.list_id = list_id
        self.position = position


    @property
    def id(self) -> int | None:
        return self._id
    
    @property
    def title(self) -> str:
        return self._title
    
    @property
    def description(self) -> str | None:
        return self._description
    
    @property
    def list_id(self) -> int:
        return self._list_id
    
    @id.setter
    def id(self, value: int | None) -> None:
        self._id = value

    @title.setter
    def title(self, value: str) -> None:
        self._title = value
    
    @description.setter
    def description(self, value: str | None) -> None:
        self._description = value

    @list_id.setter
    def list_id(self, value: int) -> None:
        self._list_id = value   

    @property
    def position(self) -> int:
        return self._position
    
    @position.setter
    def position(self, value: int) -> None:
        self._position = value