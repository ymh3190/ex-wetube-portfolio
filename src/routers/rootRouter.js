import express from "express";
import {
  getSignin,
  getSignup,
  postSignin,
  postSignup,
} from "../controllers/userController";
import { getUpload, index, postUpload } from "../controllers/videoController";
import { videoUpload } from "../middlewares";
const rootRouter = express.Router();

rootRouter.get("/", index);
rootRouter.route("/upload").get(getUpload).post(videoUpload, postUpload);
rootRouter.route("/signin").get(getSignin).post(postSignin);
rootRouter.route("/signup").get(getSignup).post(postSignup);

export default rootRouter;
