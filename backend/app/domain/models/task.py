class Task:
    def __init__(self, id: int | None, title: str, description: str | None, list_id: int, position: int = 0, assigned_user_id: int | None = None, assigned_username: str | None = None):
        self.id = id
        self.title = title
        self.description = description
        self.list_id = list_id
        self.position = position
        self.assigned_user_id = assigned_user_id
        self.assigned_username = assigned_username


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

    @property
    def assigned_user_id(self) -> int | None:
        return self._assigned_user_id

    @assigned_user_id.setter
    def assigned_user_id(self, value: int | None) -> None:
        self._assigned_user_id = value

    @property
    def assigned_username(self) -> str | None:
        return self._assigned_username

    @assigned_username.setter
    def assigned_username(self, value: str | None) -> None:
        self._assigned_username = value