import Database from '../database/users.database.js';

class UserService {
  getAllUsers() {
    return Database.getUsers();
  }

  getDetail(id) {
    const mockUser = Database.getUsers();
    return mockUser.find((u) => u.id === Number(id));
  }

  postUser(name) {
    const mockUser = Database.getUsers();
    const id = mockUser.length > 0 ? mockUser[mockUser.length - 1].id + 1 : 1;
    const newUser = { id, name };
    mockUser.push(newUser);
    Database.setUsers(mockUser);
    return newUser;
  }

  putUser(userId, name) {
    const mockUser = Database.getUsers();
    const user = mockUser.find((u) => u.id === Number(userId));
    if (!user) return null;
    user.name = name;
    Database.setUsers(mockUser);
    return user;
  }

  deleteUser(idUser) {
    const mockUser = Database.getUsers();
    const userIndex = mockUser.findIndex((u) => u.id === Number(idUser));
    if (userIndex === -1) return null;
    const deletedUser = mockUser.splice(userIndex, 1)[0];
    Database.setUsers(mockUser);
    return deletedUser;
  }
}

export default new UserService();
