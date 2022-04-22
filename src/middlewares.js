import multer from "multer";
const videoUpload = multer({ dest: "uploads/videos/" });
const photoUpload = multer({ dest: "uploads/photos/" });

export const videoUploader = videoUpload.single("video");
export const photoUploader = photoUpload.single("photo");

export const localsMiddlewares = (req, res, next) => {
  res.locals.user = req.session.user;
  res.locals.authorized = Boolean(req.session.authorized);
  next();
};

export const publicOnly = (req, res, next) => {
  if (!req.session.authorized) {
    next();
  } else {
    return res.redirect("/");
  }
};

export const privateOnly = (req, res, next) => {
  if (req.session.authorized) {
    next();
  } else {
    return res.redirect("/");
  }
};
