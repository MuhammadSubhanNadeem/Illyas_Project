import mongoose from "mongoose";
let contactMessagingSchema = new mongoose.Schema(
  {
    messageFrom: { type: String, require: true },
    messageTo: { type: String, require: true },
    message: { type: String, require: true },
  },
  { timestamps: true }
);
export let contactMessagingModelSchema = mongoose.model('contactMessages',contactMessagingSchema);