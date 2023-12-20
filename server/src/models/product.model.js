import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    summary: { type: String, required: true },
    price: { type: Number, required: true },
    discounted_price: { type: Schema.Types.Mixed, default: null }, // Use Schema.Types.Mixed
    images: { type: [String], required: true },
    category_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "categories",
    },
    brand_id: { type: mongoose.Types.ObjectId, required: true, ref: "brands" },
    featured: { type: Boolean, default: false },
    status: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
  }
);

const Product = mongoose.model("products", productSchema);
export default Product;
