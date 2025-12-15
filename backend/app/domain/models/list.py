class List:
    def __init__(self, id: int | None, name: str, board_id: int):
        self.id = id
        self.name = name
        self.board_id = board_id

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