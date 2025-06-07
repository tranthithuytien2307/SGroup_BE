import userRouter from './users.route.js';
import authRouter from './auth.route.js';
import pollRouter from './poll.route.js';
import { Router } from 'express';

const  router = Router();
router.use('/', userRouter);
router.use('/', authRouter);
router.use('/', pollRouter);

export default router;