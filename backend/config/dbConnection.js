import mongoose from "mongoose";
import "dotenv/config";
export async function connectDB(_DB_) {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/${_DB_}`);
    console.log("DB is Connected");
  } catch (error) {
    console.log(error);
  }
}
