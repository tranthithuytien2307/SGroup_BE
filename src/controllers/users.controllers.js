import usersService from '../services/users.service.js';
import UserService from '../services/users.service.js';

class UserController {

    async createUser(req, res, next) {
        try {
            const { username, password, email, role } = req.body;
            console.log("BODY", req.body);
            if (!username || typeof username !== 'string' || username.trim() === '') {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid name'
                });
            }

            await UserService.createUser(username, password, email, role);
            res.status(200).json({
                success: true,
                message: 'Create a user success'
            });
        } catch (err) {
            next(err);
        }
    }
 
    async getAllUsers(req, res, next) {
        try {
            const users = await UserService.getAllUsers();
            res.status(200).json({
                success: true,
                data: users
            });
        } catch (err) {
            next(err);
        }
    }
 
    async getDetailUser(req, res, next) {
        try {
            const { id } = req.params;

            if (!id || typeof id !== 'string' || id.trim() === '') {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid ID'
                });
            }

            const user = await UserService.getDetail(id);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            res.status(200).json({
                success: true,
                data: user
            });
        } catch (err) {
            next(err);
        }
    }

    async putUser(req, res, next) {
        try {
            const { id } = req.params;
            const { name } = req.body;

            if (!id || typeof id !== 'string' || id.trim() === '') {
                return res.status(400).json({ success: false, message: 'Invalid ID' });
            }

            if (!name || typeof name !== 'string' || name.trim() === '') {
                return res.status(400).json({ success: false, message: 'Invalid name' });
            }

            const updatedUser = await UserService.putUser(name, id);

            return res.status(200).json({
                success: true,
                data: updatedUser
            });
        } catch (err) {
            next(err);
        }
    }
    async deleteUser(req, res, next) {
        try {
            const { id } = req.params;

            if (!id || typeof id !== 'string' || id.trim() === '') {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid ID'
                });
            }

            const deletedUser = await UserService.deleteUser(id);
            res.status(200).json({
                success: true,
                data: deletedUser
            });
        } catch (err) {
            next(err);
        }
    }

    async Register(req, res, next) {
        try {
            const { username, email, password, role } = req.body;

            if (!username || typeof username !== 'string' || username.trim() === '') {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid name'
                });
            }

            await UserService.Register(username, password, email, role);
            res.status(200).json({
                success: true,
                message: 'Create a user success'
            });
        } catch (err) {
            res.status(400).json({
                success: false,
                message: err.message
            });
        }
    }

    async LoginUser(req, res, next){
        try{
            const {email, password} = req.body;
            const token = await UserService.LoginUser(email, password);
            res.status(200).json({
                success: true,
                token: token,
                message: 'Login success'
            });
        } catch(err){
            next(err);
        }
    }
    async getMe(req, res, next){
        try{
            const userId = req.user;
            const user = await usersService.getMe(userId);
            res.status(200).json({
                success: true,
                data: user
            });
        } catch(err){
            next(err)
        }
    }
    async forgotPassword(req, res, next){
        try{
            const {email} = req.body;
            const check = await usersService.forgotPassword(email);

            if (check){
                return res.status(200).json({
                    success: true,
                    message: 'Reset password email sent successfully'
                });
            }
        } catch(err){
            next(err);
        }
    }
    async resetPassword(req, res, next){
        try{
            const {email, passwordResetToken, newPassword} = req.body;

            const check = await usersService.resetPassword(email, passwordResetToken, newPassword);

            if (check) {
                return res.status(200).json({
                    success: true,
                    message: 'Reset password successfully'
                });
            }
        } catch (err){
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }
    }
    
    async updateMe(req, res, next){
        try{
            const id = req.user.id;
            const { name } = req.body;

            if (!id || typeof id !== 'string' || id.trim() === '') {
                return res.status(400).json({ success: false, message: 'Invalid ID' });
            }

            if (!name || typeof name !== 'string' || name.trim() === '') {
                return res.status(400).json({ success: false, message: 'Invalid name' });
            }

            const updatedUser = await UserService.putUser(name, id);

            return res.status(200).json({
                success: true,
                data: updatedUser
            });
        }catch(err){
            next(err);
        }
    }
}

export default new UserController();
