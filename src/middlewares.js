import multer from "multer";
const upload = multer({ dest: "uploads/videos/" });

export const videoUpload = upload.single("video");
