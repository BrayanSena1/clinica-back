// src/config/db.js
import mongoose from "mongoose";

mongoose.set("strictQuery", true);

let cached = global.mongooseConn;
if (!cached) cached = (global.mongooseConn = { conn: null, promise: null });

export async function connectDB(uri = process.env.MONGODB_URI) {
  if (!uri) throw new Error("Falta MONGODB_URI");

  if (cached.conn) return cached.conn;          // ya conectados
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(uri, { bufferCommands: false, serverSelectionTimeoutMS: 5000 })
      .then((m) => {
        console.log("MongoDB OK:", m.connection.name);
        return m;
      })
      .catch((err) => {
        console.error("MongoDB error:", err.message);
        cached.promise = null;                  // permite reintento
        throw err;                              // NO process.exit en serverless
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
