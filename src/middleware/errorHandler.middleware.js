// import { Router } from "express";

// const router = Router();

// router.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({ message: 'Internal server error' });
// });

// export default router;
const errorHandler = (err, req, res, next) => {
    if (!err.statusCode){
        err.statusCode = 500;
    }
    const resError = {
        statusCode: err.statusCode,
        message: err.message || 'Internak Server Error',
        stack: err.stack,
    }
    res.status(err.statusCode).json(resError);
}
export default errorHandler;