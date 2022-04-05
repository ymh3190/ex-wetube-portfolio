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

  const videos = await Video.find({ title: RegExp(search, "i") });
  return res.render("result", { videos });
};

export const watch = async (req, res) => {
  const {
    params: { id },
  } = req;

  const video = await Video.findById(id);
  return res.render("watch", { video });
};
