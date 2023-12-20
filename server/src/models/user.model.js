import mongoose from "mongoose";
const { Schema } = mongoose;
const userSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    phone: { type: String },
    profile: { type: String, required: false },
    address: { type: String },
    status: { type: Boolean, default: true },
    userType: {
      type: String,
      enum: ["Customer", "Staff", "Admin"],
      default: "Customer",
    },
  },
  {
    timestamps: true,
    autoIndex: true,
    autoCreate: true,
  }
);

const User = mongoose.model("users", userSchema);
export default User;
