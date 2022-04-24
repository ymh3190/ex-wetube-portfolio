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
        return "https://wetube-ymh3190.s3.ap-northeast-2.amazonaws.com/images/58b180bcba5a92d7d95c58153c9ce5b1.png";
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
  socialNet: { type: Boolean, default: false },
  subscribers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  metadata: {
    histories: [
      {
        video: { type: Schema.Types.ObjectId, ref: "Video" },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    likes: [{ type: Schema.Types.ObjectId, ref: "Video" }],
    dislikes: [{ type: Schema.Types.ObjectId, ref: "Video" }],
  },
});

const User = mongoose.model("User", userSchema);
export default User;
