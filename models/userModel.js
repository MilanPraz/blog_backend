import mongoose, { mongo } from "mongoose";

const schema = mongoose.Schema;

const UserSchema = new schema({
  username: {
    type: String,
    required: [true, "Please provide your name"],
    unique: [true, "username already taken"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: [true, "email already used"],
  },
  password: {
    type: String,
    required: [true, "please provide a password"],
    unique: false,
  },
  image: {
    type: String,
    default: "usericon.jpg",
  },
});

const userModel = mongoose.model.users || mongoose.model("users", UserSchema);
export default userModel;
