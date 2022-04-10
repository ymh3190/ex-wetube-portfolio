import express from "express";
import {
  changeEmail,
  changePassword,
  changeVisibility,
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
apiRouter.get("/deleteAccount", privateOnly, deleteAccount);
apiRouter.post("/changeVisibility", privateOnly, changeVisibility);

export default apiRouter;
