import User from "../models/User";
import bcrypt from "bcrypt";

export const getSignin = (req, res) => res.render("signin");

export const postSignin = async (req, res) => {
  const {
    body: { email, password },
  } = req;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.render("signin", { error: "이메일이 존재하지 않습니다." });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        req.session.user = user;
        return res.redirect("/");
      } else {
        return res.render("signin");
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const getSignup = (req, res) => res.render("signup");

export const postSignup = async (req, res) => {
  const {
    body: { firstName, LastName, email, password, confirmPassword },
  } = req;

  if (password !== confirmPassword) {
    return res
      .status(400)
      .render("signup", { error: "비밀번호가 일치하지 않습니다." });
  }

  if (await User.exists({ email })) {
    return res
      .status(400)
      .render("signup", { error: "이미 존재하는 이메일입니다." });
  }

  bcrypt.hash(password, 10, async (_, hash) => {
    try {
      await User.create({
        firstName,
        LastName,
        email,
        password: hash,
      });
    } catch (error) {
      console.log(error);
    }
  });
  return res.redirect("/signin");
};

export const signout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};
