import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`mongodb://localhost:27017/aceBazzar`, {
      useNewUrlParser: true,
    });
    console.log(`Connection established to DataBase`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
