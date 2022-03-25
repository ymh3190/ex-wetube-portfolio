import multer from "multer";
const upload = multer({ dest: "uploads/videos/" });

export const videoUpload = upload.single("video");

export const localsMiddlewares = (req, res, next) => {
  res.locals.user = req.session.user;
  next();
};
