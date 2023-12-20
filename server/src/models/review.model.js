import mongoose from "mongoose";
const { Schema } = mongoose;
const reviewSchema = new Schema(
  {
    user_id: { type: mongoose.Types.ObjectId, required: true, ref: "users" },
    product_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "products",
    },
    comment: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
  },
  {
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
  }
);

const Review = mongoose.model("reviews", reviewSchema);
export default Review;
