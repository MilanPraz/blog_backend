import mongoose from "mongoose";
export function connection() {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to databse"));
}
