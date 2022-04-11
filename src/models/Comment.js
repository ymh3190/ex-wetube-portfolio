import mongoose from "mongoose";
const { Schema } = mongoose;

const commentSchema = new Schema({
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  owner: { type: Schema.Types.ObjectId, required: true, ref: "User" },
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
