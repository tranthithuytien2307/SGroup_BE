import { Router } from 'express';
import userController from "../controllers/users.controllers.js";
import pollControllers from '../controllers/poll.controllers.js';
import validateMiddleware from '../middleware/validate.middleware.js';

const router = Router();

router.post('/api/User', validateMiddleware.authenticate, validateMiddleware.isAdmin, userController.createUser);
router.get('/api/User', validateMiddleware.authenticate, validateMiddleware.isAdmin, userController.getAllUsers);
router.get('/api/User/:id', validateMiddleware.authenticate,validateMiddleware.validateId, validateMiddleware.isAdmin, userController.getDetailUser);
router.delete('/api/User/:id', validateMiddleware.authenticate,validateMiddleware.isAdmin, validateMiddleware.validateId,userController.deleteUser);
router.put('/api/User/:id', validateMiddleware.authenticate, validateMiddleware.validateId,userController.putUser);
router.get('/api/Information', validateMiddleware.authenticate, validateMiddleware.validateId, userController.getMe);

router.put('/api/:id', validateMiddleware.authenticate, validateMiddleware.isAdmin, validateMiddleware.validateId, pollControllers.setLockStatus);

router.post('/api/:id/options', validateMiddleware.authenticate, validateMiddleware.isAdmin, validateMiddleware.validateId, pollControllers.addOption);
router.delete('/api/:id/options/:optionId', validateMiddleware.authenticate, validateMiddleware.isAdmin, validateMiddleware.validateId, pollControllers.removeOption);

router.post('/register', validateMiddleware.validateUser,userController.Register);
router.post('/login',validateMiddleware.validateLogin, userController.LoginUser);

export default router;