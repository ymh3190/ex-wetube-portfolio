import express from "express";
import {
  getVideoDetail,
  history,
  postVideoDetail,
  watch,
} from "../controllers/videoController";
import { privateOnly } from "../middlewares";
const videoRouter = express.Router();

videoRouter.get("/:id([\\w]{24})", watch);
videoRouter
  .route("/:id([\\w]{24})/detail")
  .all(privateOnly)
  .get(getVideoDetail)
  .post(postVideoDetail);
videoRouter.get("/histroy", history);

export default videoRouter;
