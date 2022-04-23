import express from "express";
import { history, watch } from "../controllers/videoController";
const videoRouter = express.Router();

videoRouter.get("/:id([\\w]{24})", watch);
videoRouter.get("/histroy", history);

export default videoRouter;
