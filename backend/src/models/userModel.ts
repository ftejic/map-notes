import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  uid: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
});

const User = mongoose.model("User", userSchema);
export default User;
