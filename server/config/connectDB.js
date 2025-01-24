import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
if (!process.env.MONGO_URI) {
  throw new Error("Please provide MONGO_URI in .env file");
}

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
}

export default connectDB;
