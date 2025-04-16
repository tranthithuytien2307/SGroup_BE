import { Router } from "express";
import userController from "../controllers/users.controllers.js";

const router = Router();

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getDetail);
router.post('/', userController.createUser);
router.put('/:id', userController.putUser);
router.delete('/:id', userController.deleteUser);

export default router;