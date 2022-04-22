import express from "express";
import {
  addComment,
  addDislike,
  addLike,
  addSubscribe,
  changeEmail,
  changePassword,
  changeVisibility,
  countView,
  delComment,
  deleteAccount,
  delHistory,
  recordPlayTime,
  saveInfo,
  updatePhoto,
} from "../controllers/apiController";
import { photoUploader, privateOnly } from "../middlewares";
const apiRouter = express.Router();

apiRouter.post("/save-info", privateOnly, saveInfo);
apiRouter.post("/changeEmail", privateOnly, changeEmail);
apiRouter.post("/changePassword", privateOnly, changePassword);
apiRouter.post("/updatePhoto", privateOnly, photoUploader, updatePhoto);
apiRouter.post("/changeVisibility", privateOnly, changeVisibility);
apiRouter.post("/comment", privateOnly, addComment);
apiRouter.post("/comment/del", privateOnly, delComment);
apiRouter.get("/deleteAccount", privateOnly, deleteAccount);
apiRouter.post("/views", countView);
apiRouter.post("/record/play-time", recordPlayTime);
apiRouter.post("/subscribe", addSubscribe);
apiRouter.post("/like", addLike);
apiRouter.post("/dislike", addDislike);
apiRouter.post("/delHistory", delHistory);

export default apiRouter;
