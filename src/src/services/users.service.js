import usersModule from "../model/users.model.js";
import userProvides from "../providers/user.provides.js";
class UserService {

    async createUser(name, password, email) {
        try {
            return await usersModule.createUser(name, password, email);
        } catch (err) {
            throw err;
        }
    }


    async checkUser(){
        try{
            const user = await usersModule.getAllUsers();
        } catch (err){
            throw err;
        }
    }
    async getAllUsers() {
        try {
            return await usersModule.getAllUsers();
        } catch (err) {
            throw err;
        }
    }
    async Login(email, password){
        try{
            const user = await usersModule.getUser(email, password);
            if (!user){
                throw new Error('User not found');
            }
            const token = await userProvides.encodeToken(user);
            return token;
        } catch(err){
            throw err;
        }
    }
    async getMe(id){
        const user = await usersModule.getUserById(id);
        if (!user){
            throw new Error('User not found');
        }
        const result = {
            id: user._id,
            email: user.email
        }
        return result;
    }
    
    // async getDetail(id) {
    //     try {
    //         return await usersModule.getDetail(id);
    //     } catch (err) {
    //         throw err;
    //     }
    // }

    // async putUser(name, id) {
    //     try {
    //         const user = await usersModule.putUser(name, id);
    //         if (!user) {
    //             throw new Error('User not found');
    //         }
    //         return user;
    //     } catch (err) {
    //         throw err;
    //     }
    // }

    // async deleteUser(id) {
    //     try {
    //         const user = await usersModule.deleteUser(id);
    //         if (!user.value) {
    //             throw new Error('User not found');
    //         }
    //         return user.value;
    //     } catch (err) {
    //         throw err;
    //     }
    // }
}

export default new UserService();
