import express from "express";
import {
  githubCallback,
  github,
  facebook,
  facebookCallback,
  naver,
  naverCallback,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/github", github);
userRouter.get("/github/callback", githubCallback);
userRouter.get("/facebook", facebook);
userRouter.get("/facebook/callback", facebookCallback);
userRouter.get("/naver", naver);
userRouter.get("/naver/callback", naverCallback);

export default userRouter;
