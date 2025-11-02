import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

if(!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined");
}

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`.red.underline);
        process.exit(1);
    }
}

export default connectDB;