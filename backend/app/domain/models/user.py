class User:
    def __init__(self, id: int | None, username: str, email: str, hashed_password: str):
        self.id = id
        self.username = username
        self.email = email
        self.hashed_password = hashed_password
    
    @property
    def id(self) -> int | None:
        return self._id
    
    @property
    def username(self) -> str:
        return self._username
    
    @property
    def email(self) -> str:
        return self._email
    
    @property
    def hashed_password(self) -> str:
        return self._hashed_password
    
    @id.setter
    def id(self, value: int | None) -> None:
        self._id = value
    
    @username.setter
    def username(self, value: str) -> None:
        self._username = value
    
    @email.setter
    def email(self, value: str) -> None:
        self._email = value

    @hashed_password.setter
    def hashed_password(self, value: str) -> None:
        self._hashed_password = value
    

