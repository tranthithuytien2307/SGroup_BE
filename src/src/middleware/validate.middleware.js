import Joi from "joi";

class ValidateMiddleware {
    async validateId(req, res, next) {
        try {
            const schema = Joi.object({
                id: Joi.number().required()
            });

            await schema.validateAsync(req.params, { abortEarly: false });
            next();
        } catch (err) {
            res.status(400).json({
                success: false,
                message: "Invalid ID"
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
                password: Joi.string().min(6).required()
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
                details: err.details.map(e => e,message)
            });
        }
    }
}

export default new ValidateMiddleware();
