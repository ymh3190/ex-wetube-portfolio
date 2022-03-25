import mongoose from "mongoose";
import bcrypt from "bcrypt";
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: String,
  LastName: String,
  email: String,
  password: String,
  data: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
export default User;
