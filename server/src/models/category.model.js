import mongoose from "mongoose";
const { Schema } = mongoose;
const categorySchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    status: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
  }
);

const Category = mongoose.model("categories", categorySchema);
export default Category;
