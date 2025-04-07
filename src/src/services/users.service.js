import userService from '../apis/users/user.service.js';
import Database from '../database/users.database.js';

class UserService{

getAllUsers(){ 
    return Database.getUsers();
}
 
getDetail(id){
    const mockUser = Database.getUsers(); 
    return mockUser.find((u) => u.id === Number(req.params.id));
    
}

postUser(name){
    const mockUser = Database.getUsers();
    const id = mockUser.length > 0 ? mockUser[mockUser.length - 1].id + 1 : 1;
    const newUser = { id, name };
    
    mockUser.push(newUser);
    userService.setUsers(mockUser);
    return newUser;
}

putUser(userId,name){
    const mockUser = Database.getUsers();
    const user = mockUser.find((u) => u.id === userId);
    user.name = name;
    userService.setUsers(mockUser);
    return res.json(user);
}

deleteUser(idUser) {
    const mockUser = Database.getUsers(); 
   
    const userIndex = mockUser.findIndex((u) => u.id === idUser);
    if (userIndex == -1){
        return null;
    }
    const deleteUser = mockUser.splice(userIndex, 1);
    userService.setUsers(mockUser);
    return deleteUser[0];
}

}

export default new UserService();