import { MongoClient } from "mongodb";
import 'dotenv/config';

let dbInstance = null;
const client = new MongoClient(process.env.MONGODB_URI);

const connectDB = async() => {
    await client.connect();
    dbInstance = client.db(process.env.MONGODB_NAME);
}
 const getDB = () => {
    if (!dbInstance){
        throw new Error("Database not initialized. Call connectDB first.");
    }
    return dbInstance;
 }

export{
    connectDB,
    getDB
};