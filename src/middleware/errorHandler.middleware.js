
const errorHandler = (err, req, res, next) => {
    if (!err.statusCode){
        err.statusCode = 500;
    }
    const resError = {
        statusCode: err.statusCode,
        message: err.message || 'Internal Server Error',
        stack: err.stack,
    }
    
    res.status(err.statusCode).json(resError);
}
export default errorHandler;