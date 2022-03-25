import "dotenv/config";
import mongoose from "mongoose";

mongoose
  .connect(process.env.DB_HOST)
  .then(() => console.log("Connected to DB"))
  .catch(console.error);
