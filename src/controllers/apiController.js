import User from "../models/User";
import Video from "../models/Video";
import Comment from "../models/Comment";
import bcrypt from "bcrypt";

const saltRounds = 10;

export const saveInfo = async (req, res) => {
  const {
    body: { firstName, lastName, username },
    session: { user },
  } = req;

  try {
    const newUser = await User.findByIdAndUpdate(
      { _id: user._id },
      { firstName, lastName, username },
      { new: true }
    );
    req.session.user = newUser;
    return res.status(201).send({ firstName, lastName, username });
  } catch (error) {
    console.log(error);
  }
};

export const changeEmail = async (req, res) => {
  const {
    body: { email },
    session: { user },
  } = req;

  try {
    if (!(await User.exists({ email }))) {
      const newUser = await User.findByIdAndUpdate(
        { _id: user._id },
        { email },
        { new: true }
      );
      req.session.user = newUser;
      return res.status(201).send({ email });
    }
    return res.sendStatus(400);
  } catch (error) {
    console.log(error);
  }
};

export const changePassword = async (req, res) => {
  const {
    body: { password },
    session: { user },
  } = req;

  try {
    if (!user.socialNet) {
      const hash = await bcrypt.hash(password, saltRounds);
      if (user.password !== hash) {
        const newUser = await User.findByIdAndUpdate(
          { _id: user._id },
          { password: newhash },
          { new: true }
        );
        req.session.user = newUser;
        return res.sendStatus(201);
      }
      return res.status(400).send({
        errorMessage: "이전 비밀번호와 일치합니다. 다른 비밀번호를 입력하세요.",
      });
    }
    return res.status(400).send({
      errorMessage: "SNS로 가입한 유저는 비밀번호를 변경할 수 없습니다.",
    });
  } catch (error) {
    console.log(error);
  }
};

export const updatePhoto = async (req, res) => {
  const {
    file,
    session: { user },
  } = req;

  try {
    const newUser = await User.findByIdAndUpdate(
      { _id: user._id },
      { profilePhoto: file ? file.location : "" },
      { new: true }
    );
    req.session.user = newUser;
    return res.status(201).send({ path: `/${file.location}` });
  } catch (error) {
    console.log(error);
  }
};

export const deleteAccount = async (req, res) => {
  const {
    session: { user },
  } = req;

  try {
    await User.findByIdAndDelete({ _id: user._id });
    delete req.session.authorized;
    delete req.session.user;
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
  }
};

export const changeVisibility = async (req, res) => {
  const {
    body: { id, visibility },
  } = req;

  try {
    await Video.findByIdAndUpdate(id, { visibility }, { new: true });
    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
  }
};

export const addComment = async (req, res) => {
  const {
    session,
    body: { text, id },
  } = req;

  if (!session.user) {
    return res.sendStatus(401);
  }
  const video = await Video.findById(id);
  const comment = await Comment.create({
    text,
    owner: session.user._id,
  });
  video.comments.push(comment._id);
  await video.save();
  return res
    .status(200)
    .json({ text, user: session.user, commentId: comment._id });
};

export const delComment = async (req, res) => {
  const {
    body: { commentId, videoId },
  } = req;

  const video = await Video.findById(videoId);
  for (const [i, comment] of video.comments.entries()) {
    if (comment.toString() === commentId) {
      video.comments.splice(i, 1);
    }
  }
  await video.save();
  return res.sendStatus(200);
};

export const countView = async (req, res) => {
  const {
    body: { id },
  } = req;

  try {
    const video = await Video.findById(id);
    video.metadata.views += 1;
    await video.save();
    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
  }
};

export const recordPlayTime = async (req, res) => {
  const {
    body: { id },
  } = req;

  try {
    const video = await Video.findById(id);
    video.metadata.playTime += 1;
    await video.save();
    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
  }
};

export const addSubscribe = async (req, res) => {
  const {
    session,
    body: { id },
  } = req;

  if (!session.user) {
    return res.sendStatus(401);
  }

  const video = await Video.findById(id).populate("owner");
  const user = await User.findById(session.user._id);
  const owner = await User.findById(video.owner._id);
  if (owner._id.toString() === user._id.toString()) {
    return res.end();
  }
  if (owner.subscribers.includes(user._id)) {
    return res.end();
  }
  owner.subscribers.push(user._id);
  await owner.save();
  return res.sendStatus(201);
};

export const addLike = async (req, res) => {
  const {
    session,
    body: { id },
  } = req;

  if (!session.user) {
    return res.sendStatus(401);
  }
  const video = await Video.findById(id);
  const user = await User.findById(session.user._id);
  const index = user.metadata.dislikes.indexOf(video._id);
  if (index !== -1) {
    user.metadata.dislikes.splice(index, 1);
  }
  if (!user.metadata.likes.includes(video._id)) {
    user.metadata.likes.push(video._id);
    video.metadata.liked += 1;
  } else {
    user.metadata.likes.pop();
    video.metadata.liked -= 1;
  }
  await video.save();
  await user.save();
  req.session.user = user;
  return res.status(201).send({ liked: video.metadata.liked });
};

export const addDislike = async (req, res) => {
  const {
    session,
    body: { id },
  } = req;

  if (!session.user) {
    return res.sendStatus(401);
  }
  const video = await Video.findById(id);
  const user = await User.findById(session.user._id);
  const index = user.metadata.likes.indexOf(video._id);
  if (index !== -1) {
    user.metadata.likes.splice(index, 1);
    video.metadata.liked -= 1;
  }
  if (!user.metadata.dislikes.includes(video._id)) {
    user.metadata.dislikes.push(video._id);
    video.metadata.disliked += 1;
  } else {
    user.metadata.dislikes.pop();
    video.metadata.disliked -= 1;
  }
  await video.save();
  await user.save();
  req.session.user = user;
  return res.sendStatus(201);
};

export const delHistory = async (req, res) => {
  const {
    session,
    body: { id },
  } = req;

  if (!session.user) {
    return res.sendStatus(401);
  }
  const video = await Video.findById(id);
  const user = await User.findById(session.user._id);
  const {
    metadata: { histories },
  } = user;
  for (const [i, history] of histories.entries()) {
    if (history.video._id.toString() === video._id.toString()) {
      histories.splice(i, 1);
    }
  }
  await user.save();
  req.session.user = user;
  return res.sendStatus(201);
};
