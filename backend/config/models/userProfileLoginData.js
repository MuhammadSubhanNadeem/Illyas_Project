import mongoose from "mongoose";
let dbName = "UserSignupData";
let dataSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  userEmail: { type: String, required: true, unique: true },
  userPassword: { type: String, required: true },
  userImageUniqueId: { type: String, required: false, default: null },
});
export let UserSignupData = mongoose.model("userProfileLoginModel", dataSchema, dbName);