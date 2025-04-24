import { Router } from "express";
import userController from "../controllers/users.controllers.js";
import validateMiddleware from "../middleware/validate.middleware.js";
import veryfyMiddleware from "../middleware/veryfy.middleware.js";

const router = Router();
router.post('/login',validateMiddleware.validateUser,userController.Login)
// router.post('/register',validateMiddleware.validatePassword, userController.getAllUsers)
router.post('/register', validateMiddleware.validateUser,userController.createUser)
// router.route('/:id')
//     .get(validateMiddleware.validateId, userController.getDetail)
//     .put(validateMiddleware.validateId, userController.putUser)
//     .delete(validateMiddleware.validateId, userController.deleteUser)
router.get('/getme',veryfyMiddleware.checkUser, userController.getMe);
export default router;