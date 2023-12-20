import mongoose from "mongoose";
const { Schema } = mongoose;
const brandSchema = new Schema(
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

const Brand = mongoose.model("brands", brandSchema);
export default Brand;
