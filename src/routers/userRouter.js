import express from "express";
import {
  githubCallback,
  github,
  facebook,
  facebookCallback,
  naver,
  naverCallback,
  kakao,
  kakaoCallback,
  google,
  googleCallback,
} from "../controllers/userController";
import { publicOnly } from "../middlewares";

const userRouter = express.Router();

userRouter.all(publicOnly).get("/github", github);
userRouter.get("/github/callback", githubCallback);
userRouter.all(publicOnly).get("/facebook", facebook);
userRouter.get("/facebook/callback", facebookCallback);
userRouter.all(publicOnly).get("/naver", naver);
userRouter.get("/naver/callback", naverCallback);
userRouter.all(publicOnly).get("/kakao", kakao);
userRouter.get("/kakao/callback", kakaoCallback);
userRouter.all(publicOnly).get("/google", google);
userRouter.get("/google/callback", googleCallback);

export default userRouter;
