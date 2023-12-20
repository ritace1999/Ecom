import mongoose from "mongoose";
const { Schema } = mongoose;
const orderSchema = new Schema(
  {
    user_id: { type: mongoose.Types.ObjectId, required: true, ref: "users" },
    status: {
      type: String,
      required: true,
      enum: ["Processing", "Confirmed", "Shipping", "Delivered", "Cancelled"],
      default: "Processing",
    },
  },
  {
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
  }
);

const Order = mongoose.model("orders", orderSchema);
export default Order;
