import mongoose, { Mongoose } from "mongoose";
import dotenv from "dotenv";
import { exit } from "process";
dotenv.config();
const MONGO_URL = process.env.MONGO_URL || "url is not exist";
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL)
        console.log("Mongodb is connected")
        
    } catch (error) {
      console.error("Error in connecting the Mongodb: " , error)
      exit(1);
    }
}

export default connectDB;