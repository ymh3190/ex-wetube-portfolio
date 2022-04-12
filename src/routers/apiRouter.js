import express from "express";
import {
  addComment,
  changeEmail,
  changePassword,
  changeVisibility,
  countView,
  delComment,
  deleteAccount,
  saveInfo,
  updatePhoto,
} from "../controllers/apiController";
import { photoUploader, privateOnly } from "../middlewares";
const apiRouter = express.Router();

apiRouter.post("/saveInfo", privateOnly, saveInfo);
apiRouter.post("/changeEmail", privateOnly, changeEmail);
apiRouter.post("/changePassword", privateOnly, changePassword);
apiRouter.post("/updatePhoto", privateOnly, photoUploader, updatePhoto);
apiRouter.post("/changeVisibility", privateOnly, changeVisibility);
apiRouter.post("/comment", privateOnly, addComment);
apiRouter.post("/comment/del", privateOnly, delComment);
apiRouter.get("/deleteAccount", privateOnly, deleteAccount);
apiRouter.get("/:id([\\w]{24})/views", countView);

export default apiRouter;
