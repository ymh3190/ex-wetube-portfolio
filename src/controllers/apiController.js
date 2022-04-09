import User from "../models/User";
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
    return res.status(400).end();
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
        return res.status(201).end();
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
    file: { path },
    session: { user },
  } = req;

  try {
    const newUser = await User.findByIdAndUpdate(
      { _id: user._id },
      { profilePhoto: `/${path}` },
      { new: true }
    );
    req.session.user = newUser;
    return res.status(201).send({ path: `/${path}` });
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
    delete req.session.authorised;
    delete req.session.user;
    return res.status(200).end();
  } catch (error) {
    console.log(error);
  }
};
