import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const mongoDb = process.env.DB_URL as string;
export default (async() =>{
    try {
        await mongoose.connect(mongoDb);
        console.log('Database connected');
        
    } catch (error) {
        console.log('Error', error);
        process.exit(1);
    }
})();