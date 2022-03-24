import express from "express";
import { index, postUpload } from "../controllers/videoController";
import { videoUpload } from "../middlewares";
const rootRouter = express.Router();

rootRouter.get("/", index);
rootRouter.post("/upload", videoUpload, postUpload);

export default rootRouter;
