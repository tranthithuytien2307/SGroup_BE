import UserService from '../services/users.service.js';

class UserController {
    async createUser(req, res, next) {
        try {
            const { name } = req.body;
            if (!name || typeof name !== 'string' || name.trim() === '') {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid name'
                });
            }

            const userId = await UserService.createUser(name);
            res.status(200).json({
                success: true,
                data: userId
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

    async getDetail(req, res, next) {
        try {
            const { id } = req.params;
            if (isNaN(id) || Number(id) <= 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid ID'
                });
            }

            const user = await UserService.getDetail(id);
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

            if (!name || typeof name !== 'string' || name.trim() === '') {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid name'
                });
            }

            if (isNaN(id) || Number(id) <= 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid ID'
                });
            }

            const updatedUser = await UserService.putUser(name, id);
            res.status(200).json({
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
            if (isNaN(id) || Number(id) <= 0) {
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
}

export default new UserController();
