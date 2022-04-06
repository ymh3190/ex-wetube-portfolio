import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    default: function () {
      if (!this.firstName) {
        return "이름";
      }
      return this.firstName;
    },
  },
  lastName: {
    type: String,
    default: function () {
      if (!this.lastName) {
        return "성";
      }
      return this.lastName;
    },
  },
  email: { type: String, required: true },
  profilePhoto: {
    type: String,
    default: function () {
      if (!this.profilePhoto) {
        return "/static/58b180bcba5a92d7d95c58153c9ce5b2.png";
      }
      return this.profilePhoto;
    },
  },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  username: {
    type: String,
    default: function () {
      if (!this.username) {
        return `${this.lastName} ${this.firstName}`;
      }
      return this.username;
    },
  },
  socialNet: Boolean,
});

const User = mongoose.model("User", userSchema);
export default User;
