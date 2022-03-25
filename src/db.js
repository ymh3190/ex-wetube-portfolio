import mongoose from "mongoose";

mongoose
  .connect("mongodb://127.0.0.1:27017/wetube-recall")
  .then(() => console.log("Connected to DB"))
  .catch(console.error);
