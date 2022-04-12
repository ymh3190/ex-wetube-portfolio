import mongoose from "mongoose";
const { Schema } = mongoose;

const videoSchema = new Schema({
  title: { type: String, required: true },
  path: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  metadata: {
    views: { type: Number, default: 0 },
    playTime: { type: Number, default: 0 },
    liked: { type: Schema.Types.ObjectId, ref: "User" },
    disliked: { type: Schema.Types.ObjectId, ref: "User" },
  },
  description: String,
  owner: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  visibility: { type: String, required: true },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
