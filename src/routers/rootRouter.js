import express from "express";
import {
  getGithub,
  getSignin,
  getSignup,
  postSignin,
  postSignup,
  signout,
} from "../controllers/userController";
import {
  getUpload,
  index,
  postUpload,
  result,
} from "../controllers/videoController";
import { videoUpload } from "../middlewares";
const rootRouter = express.Router();

rootRouter.get("/", index);
rootRouter.route("/upload").get(getUpload).post(videoUpload, postUpload);
rootRouter.route("/signin").get(getSignin).post(postSignin);
rootRouter.route("/signup").get(getSignup).post(postSignup);
rootRouter.get("/signout", signout);
rootRouter.get("/result", result);

export default rootRouter;
