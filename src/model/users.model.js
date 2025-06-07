import { ObjectId, ReturnDocument } from "mongodb";
import { getDB } from "../config/db.config.js";

class UserModule {
    async createUser(name, password, email, role = 'user') {
        try {
            const validRole = ['user', 'admin'];
            const userRole = validRole.includes(role) ? role : 'user';

            const user = await getDB().collection('user').insertOne({
                name: name.trim(),
                password: password.trim(),
                email: email.trim(),
                role: userRole
            });
            return user.insertedId;
        } catch (err) {
            throw err;
        }
    }

    async Register(name, password, email, role = 'user') {
        try {
            const db = getDB();
            const existingUser = await db.collection('user').findOne({ email: email.trim() });

            if (existingUser) {
                throw new Error('Email already exists');
            }

            const validRole = ['user', 'admin'];
            const cleanedRole = typeof role === 'string' ? role.trim().toLowerCase() : 'user';
            const userRole = validRole.includes(cleanedRole) ? cleanedRole : 'user';

            const user = await db.collection('user').insertOne({
                name: name.trim(),
                password: password.trim(),
                email: email.trim(),
                role: userRole
            });

            return user.insertedId;
        } catch (err) {
            throw err;
        }
    }

    async getUserByEmail(email) {
        try {
            return await getDB().collection('user').findOne({ email: email });
        } catch (err) {
            throw err;
        }
    }

    async getUserById(_id) {
        try {
            return await getDB().collection('user').findOne({ _id: new ObjectId(_id) });
        } catch (err) {
            throw err;
        }
    }

    async setResetPasswordToken(email, resetPasswordToken, resetPasswordExpiration) {
        try {
            const result = await getDB().collection('user').updateOne(
                { email },
                {
                    $set: {
                        resetPasswordToken,
                        resetPasswordExpiration
                    }
                }
            );
            return result.matchedCount > 0;
        } catch (err) {
            throw err;
        }
    }

    async checkResetPassword(email, resetPasswordToken) {
        try {
            return await getDB().collection('user').findOne({
                email,
                resetPasswordToken,
                resetPasswordExpiration: { $gt: new Date() }
            });
        } catch (err) {
            throw err;
        }
    }

    async resetPassword(password, email) {
        try {
            const result = await getDB().collection('user').updateOne(
                { email },
                {
                    $set: {
                        password: password,
                        resetPasswordToken: null,
                        resetPasswordExpiration: null,
                        lastResetPasswordDate: new Date()
                    }
                }
            );
            return result.matchedCount > 0;
        } catch (err) {
            throw err;
        }
    }

    async getAllUsers() {
        try {
            return await getDB().collection('user').find().toArray();
        } catch (err) {
            throw err;
        }
    }

    async getUser(email, password) {
        try {
            return await getDB().collection('user').findOne({ email: email, password: password });
        } catch (err) {
            throw err;
        }
    }

    async getDetail(_id) {
        try {
            return await getDB().collection('user').findOne({ _id: new ObjectId(_id) });
        } catch (err) {
            throw err;
        }
    }

    async putUser(name, _id) {
        if (!ObjectId.isValid(_id)) {
            console.error("ID không hợp lệ:", _id);
            return null;
        }
        const objectId = new ObjectId(_id);
        const result = await getDB().collection('user').findOneAndUpdate(
            { _id: objectId },
            { $set: { name: name.trim() } },
            { returnDocument: ReturnDocument.AFTER }
        );
        if (!result.value) {
            console.error("Không tìm thấy user trong DB với ID:", _id);
        }
        return result;
    }

    async deleteUser(_id) {
        try {
            return await getDB().collection('user').findOneAndDelete({ _id: new ObjectId(_id) });
        } catch (err) {
            throw err;
        }
    }
}

export default new UserModule();
