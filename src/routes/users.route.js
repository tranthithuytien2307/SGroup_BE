import { Router } from "express";
import userController from "../controllers/users.controllers.js";
import validateMiddleware from "../middleware/validate.middleware.js";
import veryfyMiddleware from "../middleware/veryfy.middleware.js";
import pollControllers from "../controllers/poll.controllers.js";

const router = Router();

router.put( '/api/:id/:optionId', validateMiddleware.authenticate, pollControllers.setVoteStatus);

router.post('/register', validateMiddleware.validateUser,userController.Register);
router.post('/login',validateMiddleware.validateLogin, userController.LoginUser);
router.get('/information',veryfyMiddleware.checkUser, userController.getMe);
router.put('/updateInformation', validateMiddleware.authenticate, userController.updateMe);

router.post('/forgot-password',validateMiddleware.validateEmail, userController.forgotPassword);
router.post('/reset-password',validateMiddleware.validateResetPassword, userController.resetPassword);

export default router;