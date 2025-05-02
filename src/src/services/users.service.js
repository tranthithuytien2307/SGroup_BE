import usersModule from "../model/users.model.js";
import userProvides from "../providers/user.provides.js";
import hashProvides from "../providers/hash.provides.js";
class UserService {
    async Register(name, password, email) {
        try {
            const { hashString } = await hashProvides.generateHash(password);
            const user = await usersModule.Register(name, hashString, email);
            return user;
        } catch (err) {
            throw err;
        }
    }
    async LoginUser(email, password){
        try{
            const user = await usersModule.getUserByEmail(email);
            console.log(user.password);
            
            if (!user){
                throw new Error('User not found');
            }
            const check = await hashProvides.compareHash(password, user.password);
            
            if (check){
                const token = await userProvides.encodeToken(user);
                return token;
            } else {
                throw new Error('Login unsuccess');
            }
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
            username: user.name,
            id: user._id,
            email: user.email
        }
        return result;
    }
    // async Login(email, password){
    //     try{
    //         const user = await usersModule.getUser(email, password);
    //         if (!user){
    //             throw new Error('User not found');
    //         }
    //         const token = await userProvides.encodeToken(user);
    //         return token;
    //     } catch(err){
    //         throw err;
    //     }
    // }
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
