import mongoose from "mongoose";
let dataSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  contactId: { type: String, required: true },
});
export let contactConnections = mongoose.model("contactConnections", dataSchema);