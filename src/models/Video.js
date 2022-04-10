import mongoose from "mongoose";
const { Schema } = mongoose;

const videoSchema = new Schema({
  title: { type: String, required: true },
  path: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  views: { type: Number, default: 0 },
  description: String,
  owner: { type: mongoose.Types.ObjectId, required: true },
  visibility: { type: String, required: true },
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
