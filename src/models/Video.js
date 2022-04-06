import mongoose from "mongoose";
const { Schema } = mongoose;

const videoSchema = new Schema({
  title: String,
  path: String,
  createdAt: { type: Date, default: Date.now },
  views: { type: Number, default: 0 },
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
