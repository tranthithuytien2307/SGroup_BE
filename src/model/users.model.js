import { ObjectId, ReturnDocument } from "mongodb";
import { getDB } from "../config/db.config.js";

class UserModule {
    async Register(name, password, email){
        try {
            const user = await getDB().collection('user').insertOne({
                name: name,
                password: password,
                email: email
            });
            return user.insertedId;
        } catch (err) {
            throw err;
        }
    }
    async getUserByEmail(email){
        try{
            const user = await getDB().collection('user').findOne({email: email});
            return user;
        }catch(err){
            throw err;
        }
    }
    async getUserById(_id){
        try {
            return await getDB().collection('user').findOne({  _id: new ObjectId(_id)  });
        } catch (err) {
            throw err;
        }
    }
    async setResetPasswordToken(email, resetPasswordToken, resetPasswordExpiration){
        try{
            const result = await getDB().collection('user').updateOne(
                {email},
                {$set: {
                    resetPasswordToken,
                    resetPasswordExpiration
                }}
            );

            return result.matchedCount > 0;
        } catch(err){
            throw err;
        }
    }
    async checkResetPassword(email, resetPasswordToken){
        try{
            const result = await getDB().collection('user').findOne({
                email,
                resetPasswordToken,
                resetPasswordExpiration: { $gt: new Date()}
            });
            return result;
        } catch(err){
            throw err;
        }
    }
    async resetPassword(password, email){
        try{
            const result = await getDB().collection('user').updateOne(
                {email},
                {$set: {
                    password: password,
                    resetPasswordToken: null,
                    resetPasswordExpiration: null,
                    lastResetPasswordDate: new Date()
                }}
            );
            return result.matchedCount > 0;
        } catch (err){
            throw err;
        }
    }
    // async createUser(name, password, email) {
    //     try {
    //         const user = await getDB().collection('user').insertOne({
    //             name: name.trim(),
    //             password: password.trim(),
    //             email: email.trim()
    //         });
    //         return user.insertedId;
    //     } catch (err) {
    //         throw err;
    //     }
    // }
    // async getAllUsers() {
    //     try {
    //         return await getDB().collection('user').find().toArray();
    //     } catch (err) {
    //         throw err;
    //     }
    // }
    // async getUser(email, password){
    //     try{
    //         const user =  await getDB().collection('user').findOne({email: email, password: password})
            
    //         return user;
    //     } catch(err){
    //         throw err;
    //     }
    // }
    // // async getDetail(_id) {
    //     try {
    //         return await getDB().collection('user').findOne({ _id: new ObjectId(_id) });
    //     } catch (err) {
    //         throw err;
    //     }
    // }

    // async putUser(name, _id) {
    //     try {
    //         const user = await getDB().collection('user').findOneAndUpdate(
    //             { _id: new ObjectId(_id) },
    //             { $set: { name: name.trim() } },
    //             { returnDocument: ReturnDocument.AFTER }
    //         );
    //         return user.value;
    //     } catch (err) {
    //         throw err;
    //     }
    // }

    // async deleteUser(_id) {
    //     try {
    //         return await getDB().collection('user').findOneAndDelete({ _id: new ObjectId(_id) });
    //     } catch (err) {
    //         throw err;
    //     }
    // }
}

export default new UserModule();
