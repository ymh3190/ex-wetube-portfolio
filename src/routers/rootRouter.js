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
import { privateOnly, publicOnly, videoUpload } from "../middlewares";
const rootRouter = express.Router();

rootRouter.get("/", index);
rootRouter
  .all(privateOnly)
  .route("/upload")
  .get(getUpload)
  .post(videoUpload, postUpload);
rootRouter.all(publicOnly).route("/signin").get(getSignin).post(postSignin);
rootRouter.all(publicOnly).route("/signup").get(getSignup).post(postSignup);
rootRouter.all(privateOnly).get("/signout", signout);
rootRouter.get("/result", result);

export default rootRouter;
