import mongoose from "mongoose";
mongoose.set("strictQuery", true);

export async function connectDB(uri = process.env.MONGODB_URI) {
  try {
    await mongoose.connect(uri, { bufferCommands: false, serverSelectionTimeoutMS: 15000 });
    // console.log("MongoDB OK:", mongoose.connection.name);
  } catch (e) {
    console.error("MongoDB error:", e.message);
    throw e;
  }
}
