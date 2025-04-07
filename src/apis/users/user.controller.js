import userService from "./user.service.js";

class UserController{

getAll(req, res, next){ 
    const mockUser = userService.getUsers(); 
    return res.json(mockUser);  
}
 
getDetail(req, res, next){
    const mockUser = userService.getUsers(); 
    const user = mockUser.find((u) => u.id === Number(req.params.id));
    if (!user){
        return res.status(404).json({message: "User not found"});
    }
    return res.json(user);
}

postUser(req, res, next){
    const mockUser = userService.getUsers(); 
    const { name } = req.body;
    if (!name){
        return res.status(400).json({message: "Name is required"});
    }
    const id = mockUser.length > 0 ? mockUser[mockUser.length - 1].id + 1 : 1;
    const newUser = { id, name };
    
    mockUser.push(newUser);
    userService.setUsers(mockUser);
    res.status(201).json({message: "User add successfully", newUser});
    return res.json(mockUser);
}

putUser(req, res, next){
    const mockUser = userService.getUsers(); 
    const userId = Number(req.params.id);
    const { name } = req.body;
    const user = mockUser.find((u) => u.id === userId);
    if (!user){
        return res.status(400).json({message: "User not found"});
    }
    if (!name){
        return res.status(400).json({message: "Name is required"});
    }
    user.name = name;
    userService.setUsers(mockUser);
    return res.json(user);
}

deleteUser(req, res, next) {
    const mockUser = userService.getUsers(); 
    const idUser = Number(req.params.id);
    const userIndex = mockUser.findIndex((u) => u.id === idUser);
    if (userIndex == -1){
        return res.status(404).json({message: "User not found"});
    }
    mockUser.splice(userIndex, 1);
    userService.setUsers(mockUser);
    return res.json(mockUser);
}

}

export default new UserController();