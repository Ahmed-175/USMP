import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  throw new Error("MONGO_URL is not defined in environment variables");
}
export const connectToDb = () => {
  mongoose
    .connect(MONGO_URL)
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((error) => {
      console.error("Database connection failed", error);
    });
};
