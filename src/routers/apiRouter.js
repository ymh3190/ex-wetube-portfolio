import express from "express";
import {
  changeEmail,
  changePassword,
  saveInfo,
} from "../controllers/apiController";
const apiRouter = express.Router();

apiRouter.post("/saveInfo", saveInfo);
apiRouter.post("/changeEmail", changeEmail);
apiRouter.post("/changePassword", changePassword);

export default apiRouter;
