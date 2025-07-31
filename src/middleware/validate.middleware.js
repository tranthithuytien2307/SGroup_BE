import Joi from "joi";
import jwt from "jsonwebtoken";
class ValidateMiddleware {
    async authenticate(req, res, next){
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({
            success: false,
            message: 'Unauthorized'
        });
        try{
          const decode = jwt.verify(token, process.env.JWT_SECRET);
          req.user = {
            id: decode.id,
            role: decode.role,
            email: decode.email
        };
          next();
        }catch(err){
            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            });
        }
    }
    async isAdmin(req, res, next){
        if(req.user.role !== 'admin'){
            return res.status(403).json({
                success: false,
                message: 'Forbidden: Admin only'
            })
        }
        next();
    }
    async isUser(req, res, next){
        if (req.user.role !== 'user'){
            return res.status(403).json({
                success: false,
                message: 'Forbidden: User only'
            })
        }
        next();
    }
    async validateId(req, res, next) {
        try {
            const schema = Joi.object({
                id: Joi.string().length(24).required(),
                optionId: Joi.string().length(24).optional() 
            });

            await schema.validateAsync(req.params, { abortEarly: false });
            next();
        } catch (err) {
            res.status(400).json({
                success: false,
                message: "Invalid ID",
                details: err.details?.map(e => e.message)
            });
        }
    }


    async validatePassword(req, res, next) {
        try {
            const schema = Joi.object({
                password: Joi.string().required()
            });

            await schema.validateAsync(req.body, { abortEarly: false });
            next();
        } catch (err) {
            res.status(400).json({
                success: false,
                message: "Invalid Password"
            });
        }
    }

    async validateUser(req, res, next) {
        try {
            const schema = Joi.object({
                username: Joi.string().required(),
                email: Joi.string().email().required(),
                password: Joi.string().min(6).required(),
                role: Joi.string().valid("admin", "user").optional()
                });


            await schema.validateAsync(req.body, { abortEarly: false });
            next();
        } catch (err) {
            res.status(400).json({
                success: false,
                message: "Invalid User Data",
                details: err.details.map(e => e.message)
            });
        }
    }
    async validateEmail(req, res, next){
        try{
            const schema = Joi.object({
                email: Joi.string().email().required()
            });
            await schema.validateAsync(req.body, { abortEarly: false});
            next();
        } catch(err){
            res.status(400).json({
                success: false,
                message: "Invalid Login Data",
                details: err.details.map(e => e,message)
            });
        }
    }
    async validateLogin(req, res, next){
        try{
            const schema = Joi.object({
                email: Joi.string().email().required(),
                password: Joi.string().min(6).required()
            });
            await schema.validateAsync(req.body, { abortEarly: false});
            next();
        } catch(err){
            res.status(400).json({
                success: false,
                message: "Invalid Login Data",
                details: err.details.map(e => e.message)
            });
        }
    }
    async validateResetPassword(req, res, next) {
        try {
            const schema = Joi.object({
                email: Joi.string().email().required(),
                newPassword: Joi.string().min(6).required(),
                passwordResetToken: Joi.string().required()
            });
            await schema.validateAsync(req.body, { abortEarly: false });
            next();
        } catch (err) {
            res.status(400).json({
                success: false,
                message: "Invalid Login Data",
                details: err.details.map(e => e.message)
            });
        }
    }
    
}

export default new ValidateMiddleware();
