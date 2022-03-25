import Video from "../models/Video";

export const index = async (req, res) => {
  const videos = await Video.find({});
  return res.render("index", { videos });
};

export const getUpload = (req, res) => res.render("upload");

export const postUpload = async (req, res) => {
  const {
    file: { originalname, path },
    body: { title },
  } = req;
  await Video.create({ title: title ? title : originalname, path });
  return res.redirect("/");
};

export const result = async (req, res) => {
  const {
    query: { search },
  } = req;

  if (!search) {
    // TODO: 프론트엔드에서 클릭 막기
  }

  const videos = await Video.find({ title: RegExp(search, "i") });
  return res.render("result", { videos });
};
