import { ReturnDocument } from "mongodb";
import { getDB } from "../config/db.config.js";

class UserService {
    validateName(name) {
        if (!name || typeof name !== 'string' || name.trim() === '') {
            throw new Error('Invalid name');
        }
    }

    validateId(id) {
        if (isNaN(id) || Number(id) <= 0) {
            throw new Error('Invalid ID');
        }
    }

    async createUser(name) {
        try {
            this.validateName(name);

            const count = await getDB().collection('user').countDocuments();
            const user = await getDB().collection('user').insertOne({
                name: name.trim(),
                id: count + 1
            });
            return user.insertedId;
        } catch (err) {
            throw err;
        }
    }

    async getAllUsers() {
        try {
            const users = await getDB().collection('user').find().toArray();
            return users;
        } catch (err) {
            throw err;
        }
    }

    async getDetail(id) {
        try {
            this.validateId(id);

            const user = await getDB().collection('user').findOne({ id: Number(id) });
            return user;
        } catch (err) {
            throw err;
        }
    }

    async putUser(name, id) {
        try {
            this.validateName(name);
            this.validateId(id);

            const user = await getDB().collection('user').findOneAndUpdate(
                { id: Number(id) },
                { $set: { name: name.trim() } },
                { returnDocument: ReturnDocument.AFTER }
            );
            if (!user.value) {
                throw new Error('User not found');
            }
            return user.value;
        } catch (err) {
            throw err;
        }
    }

    async deleteUser(id) {
        try {
            this.validateId(id);

            const user = await getDB().collection('user').findOneAndDelete({ id: Number(id) });
            if (!user.value) {
                throw new Error('User not found');
            }
            return user.value;
        } catch (err) {
            throw err;
        }
    }
}

export default new UserService();
