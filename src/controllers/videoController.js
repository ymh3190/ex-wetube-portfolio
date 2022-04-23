import User from "../models/User";
import Video from "../models/Video";

export const index = async (req, res) => {
  const videos = await Video.find({ visibility: "public" }).populate("owner");
  return res.render("index", { videos });
};

export const getUpload = (req, res) => res.render("upload");

export const postUpload = async (req, res) => {
  const {
    session: { user },
    file,
    body: { title, description, visibility },
  } = req;

  await Video.create({
    title: title ? title : file.originalname,
    path: process.env.NODE_ENV ? file.location : file.path,
    owner: user._id,
    description,
    visibility,
  });
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
    session,
    params: { id },
  } = req;

  const video = await Video.findById(id)
    .populate({
      path: "comments",
      populate: { path: "owner" },
    })
    .populate("owner");

  if (session.authorized) {
    const user = await User.findById(session.user._id);
    const {
      metadata: { histories },
    } = user;
    if (!histories.length) {
      histories.push({ video: video._id });
    } else {
      for (const [i, history] of histories.entries()) {
        if (history.video._id.toString() === video.id) {
          histories.splice(i, 1);
        }
      }
      histories.push({ video: video._id });
    }
    await user.save();
    req.session.user = user;
  }
  return res.render("watch", { video });
};

export const studio = async (req, res) => {
  const {
    session: { user },
    params: { id },
  } = req;

  if (user._id !== id) {
    return res.redirect("/");
  }
  const videos = await Video.find({ owner: id });
  return res.render("studio", { videos });
};

export const getVideoDetail = async (req, res) => {
  const {
    session: { user },
    params: { id },
  } = req;

  const video = await Video.findById(id);
  if (video.owner.toString() !== user._id) {
    return res.redirect("/");
  }
  return res.render("videoDetail", { video });
};

export const postVideoDetail = async (req, res) => {
  const {
    session: { user },
    params: { id },
    body: { title, description },
  } = req;

  const video = await Video.findById(id);
  if (video.owner.toString() !== user._id) {
    return res.redirect("/");
  }
  if (!title) {
    return res.redirect(`/videos/${id}/detail`);
  }
  await video.update({ title, description });
  return res.redirect(`/studio/${user._id}`);
};

export const history = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
  } = req;

  const user = await User.findById(_id);
  const { histories } = await user.metadata.populate({
    path: "histories",
    populate: { path: "video", populate: { path: "owner" } },
  });

  return res.render("history", { histories });
};
