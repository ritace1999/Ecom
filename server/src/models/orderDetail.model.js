import mongoose from "mongoose";
const { Schema } = mongoose;
const orderDetailSchema = new Schema(
  {
    order_id: { type: mongoose.Types.ObjectId, required: true, ref: "orders" },
    product_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "products",
    },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  {
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
  }
);

const OrderDetail = mongoose.model("orderDetails", orderDetailSchema);
export default OrderDetail;
