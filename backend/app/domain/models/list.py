class List:
    def __init__(self, id: int | None, name: str, board_id: int, position: int = 0):
        self.id = id
        self.name = name
        self.board_id = board_id
        self.position = position

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
def board_id(self):
    return self._board_id

@board_id.setter
def board_id(self, value):
    self._board_id = value

@property
def position(self):
    return self._position

@position.setter
def position(self, value):
    self._position = value