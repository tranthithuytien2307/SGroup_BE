import userProvides from "../providers/user.provides.js";

class verifyMiddleware{
    async checkUser(req, res, next){
        try{
            const header = req.headers.authorization;
            if (!header){
                throw new Error('Not login yet');
            }
            const token = header.split(' ')[1];
            const data = await userProvides.decodeToken(token);
            req.user = data.id;
            next();
        } catch(err){
            next(err);
        }
    }
};
export default new verifyMiddleware();