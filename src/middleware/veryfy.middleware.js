import userProvides from "../providers/user.provides.js";

class verifyMiddleware{
    async checkUser(req, res, next) {
        try {
            const header = req.headers.authorization;
            if (!header) {
                throw new Error('Not login yet');
            }

            const token = header.split(' ')[1];
            const data = await userProvides.decodeToken(token); 

            if (!data || !data.id || !data.role) {
                throw new Error('Invalid token payload');
            }

            req.user = data; 
            next();
        } catch (err) {
            res.status(401).json({ success: false, message: err.message || 'Unauthorized' });
        }
    }

};
export default new verifyMiddleware();