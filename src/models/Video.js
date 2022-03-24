import mongoose from "mongoose";
const { Schema } = mongoose;

const videoSchema = new Schema({
  title: String,
  path: String,
  data: { type: Date, default: Date.now },
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
