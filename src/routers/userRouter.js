import express from "express";
import {
  githubCallback,
  github,
  facebook,
  facebookCallback,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/github", github);
userRouter.get("/github/callback", githubCallback);
userRouter.get("/facebook", facebook);
userRouter.get("/facebook/callback", facebookCallback);

export default userRouter;
