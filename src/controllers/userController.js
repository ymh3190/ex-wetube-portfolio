import User from "../models/User";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import fetch from "node-fetch";

const saltRounds = 10;

export const getSignin = (req, res) => res.render("signin");

export const postSignin = async (req, res) => {
  const {
    body: { email, password },
  } = req;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .render("signin", { error: "이메일이 존재하지 않습니다." });
    }

    // 비밀번호 체크
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      req.session.user = user;
      return res.redirect("/");
    } else {
      return res
        .status(400)
        .render("signin", { error: "비밀번호가 일치하지 않습니다." });
    }
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

  // 메일 보내기
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Transporter Team" <${process.env.NODEMAILER_USER}>`,
      to: email,
      subject: `${LastName}, finish setting up your new Account`,
      text: "Hello world?",
      html: "<b>Hello world?</b>",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .render("signup", { error: "메일을 전송할 수 없습니다." });
  }

  // 비밀번호 해쉬
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    if (hash) {
      await User.create({
        firstName,
        LastName,
        email,
        password: hash,
      });
      return res.redirect("/signin");
    }
  } catch (error) {
    console.log(error);
    return res.render("signup", { error: "해쉬를 할 수 없습니다." });
  }
};

export const signout = (req, res) => {
  req.session.destroy();
  return res.redirect("/");
};

export const github = (req, res) => {
  const params = `client_id=${process.env.GITHUB_CLIENT}&scope=read:user%20user:email`;
  const url = `https://github.com/login/oauth/authorize?${params}`;
  return res.redirect(url);
};

export const githubCallback = async (req, res) => {
  const params = `client_id=${process.env.GITHUB_CLIENT}&client_secret=${process.env.GITHUB_SECRET}&code=${req.query.code}`;
  const url = `https://github.com/login/oauth/access_token?${params}`;
  const response = await (
    await fetch(url, {
      method: "post",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();
  if ("access_token" in response) {
    const { access_token } = response;
    const url = "https://api.github.com/user";
    const userData = await (
      await fetch(url, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();
    const emailData = await (
      await fetch(`${url}/emails`, {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();

    const email = emailData.find(
      (email) => email.primary === true && email.verified === true
    ).email;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        user = await User.create({
          email,
          password: await bcrypt.hash("", saltRounds),
        });
      }
      req.session.user = user;
      return res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  } else {
    return res.redirect("/signin");
  }
};
