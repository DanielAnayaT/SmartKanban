class UserAlreadyExistsError(Exception):
    pass


class UsernameAlreadyExistsError(UserAlreadyExistsError):
    pass


class EmailAlreadyExistsError(UserAlreadyExistsError):
    pass

class ValueError(Exception):
    pass

class ProjectNotFoundError(Exception):
    pass

class BoardNotFoundError(Exception):
    pass

class ListNotFoundError(Exception):
    pass

class TaskNotFoundError(Exception):
    pass