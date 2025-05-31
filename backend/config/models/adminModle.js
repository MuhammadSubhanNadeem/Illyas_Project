import mongoose from "mongoose";
const adminLoginSchema = new mongoose.Schema({
  email: {
    type: "String",
    required: true,
  },
  password: { type: "String", required: true },
}, {timestamps: true});
export const adminLoginModle = mongoose.model("adminLogin", adminLoginSchema);
