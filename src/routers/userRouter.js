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
  getEditProfile,
  postEditProfile,
} from "../controllers/userController";
import { privateOnly, publicOnly } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/github", publicOnly, github);
userRouter.get("/github/callback", githubCallback);
userRouter.get("/facebook", publicOnly, facebook);
userRouter.get("/facebook/callback", facebookCallback);
userRouter.get("/naver", publicOnly, naver);
userRouter.get("/naver/callback", naverCallback);
userRouter.get("/kakao", publicOnly, kakao);
userRouter.get("/kakao/callback", kakaoCallback);
userRouter.get("/google", publicOnly, google);
userRouter.get("/google/callback", googleCallback);
userRouter
  .route("/:id([\\w]{24})")
  .all(privateOnly)
  .get(getEditProfile)
  .post(postEditProfile);

export default userRouter;
