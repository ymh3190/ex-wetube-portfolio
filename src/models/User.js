import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: String,
  LastName: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  data: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
export default User;
