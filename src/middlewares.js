import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
const s3 = new aws.S3({
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },
});
const imageStorage = multerS3({
  s3,
  bucket: "wetube-ymh3190/images",
  acl: "public-read",
});
const videoStorage = multerS3({
  s3,
  bucket: "wetube-ymh3190/videos",
  acl: "public-read",
});

const videoUpload = multer({
  dest: "uploads/videos/",
  storage: process.env.NODE_ENV ? imageStorage : undefined,
});
const photoUpload = multer({
  dest: "uploads/photos/",
  storage: process.env.NODE_ENV ? videoStorage : undefined,
});

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
