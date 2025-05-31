import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    orderTo: { type: String, required: true },
    orderFrom: { type: String, required: true },
    orderType: { type: String, required: true },
    orderPrice: { type: Number, required: true },
    orderDescription: { type: String, required: true, default: "" },
    orderStatus: { type: String, required: true,  enum: ["pending", "cancel", "complete", "accept"], default: "pending" },
  },
  { timestamps: true }
);
export const orderModel = mongoose.model("Order", orderSchema);
