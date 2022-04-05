import express from "express";
import { watch } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id([\\w]{24})", watch);

export default videoRouter;
