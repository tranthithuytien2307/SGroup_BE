import { Router } from "express";

const router = Router();

router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
});

export default router;