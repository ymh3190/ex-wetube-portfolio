import express from "express";
import { githubCallback, github } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/github", github);
userRouter.get("/github/callback", githubCallback);

export default userRouter;
