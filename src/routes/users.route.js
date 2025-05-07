import { Router } from "express";
import userController from "../controllers/users.controllers.js";
import validateMiddleware from "../middleware/validate.middleware.js";
import veryfyMiddleware from "../middleware/veryfy.middleware.js";

const router = Router();
router.post('/register', validateMiddleware.validateUser,userController.Register);
router.post('/login',validateMiddleware.validateLogin, userController.LoginUser);
router.get('/getme',veryfyMiddleware.checkUser, userController.getMe);

router.post('/forgot-password',validateMiddleware.validateEmail, userController.forgotPassword);
router.post('/reset-password',validateMiddleware.validateResetPassword, userController.resetPassword);
export default router;