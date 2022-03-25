import User from "../models/User";
import bcrypt from "bcrypt";

export const getSignin = (req, res) => res.render("signin");

export const postSignin = (req, res) => {
  return res.redirect("/");
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

  bcrypt.hash(password, 10, async (err, hash) => {
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

  return res.redirect("/");
};
