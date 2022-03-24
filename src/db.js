import mongoose from "mongoose";

const main = async () => {
  mongoose.connect("mongodb://127.0.0.1:27017/wetube");
  console.log("connected to mongoDB");
};

main().catch((err) => console.log(err));
