import express from "express";
import {
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
  studio,
} from "../controllers/videoController";
import { privateOnly, publicOnly, videoUploader } from "../middlewares";
const rootRouter = express.Router();

rootRouter.get("/", index);
rootRouter
  .route("/upload")
  .all(privateOnly)
  .get(getUpload)
  .post(videoUploader, postUpload);
rootRouter.route("/signin").all(publicOnly).get(getSignin).post(postSignin);
rootRouter.route("/signup").all(publicOnly).get(getSignup).post(postSignup);
rootRouter.get("/signout", privateOnly, signout);
rootRouter.get("/result", result);
rootRouter.get("/studio/:id([\\w]{24})", studio);

export default rootRouter;
