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
    body: { firstName, lastName, email, password, confirm },
  } = req;

  if (password !== confirm) {
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
      subject: `${lastName}, finish setting up your new Account`,
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
    await User.create({
      firstName,
      lastName,
      email,
      password: await bcrypt.hash(password, saltRounds),
    });
    return res.redirect("/signin");
  } catch (error) {
    console.log(error);
    return res.render("signup", { error: "해쉬를 할 수 없습니다." });
  }
};

export const signout = async (req, res) => {
  await req.session.destroy();
  return res.redirect("/");
};

export const github = (req, res) => {
  const params = `client_id=${process.env.GITHUB_CLIENT}&scope=read:user`;
  const url = `https://github.com/login/oauth/authorize?${params}`;
  return res.redirect(url);
};

export const githubCallback = async (req, res) => {
  const config = {
    client_id: process.env.GITHUB_CLIENT,
    client_secret: process.env.GITHUB_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
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
    const { login, email, avatar_url, name } = await (
      await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `token ${access_token}`,
        },
      })
    ).json();

    try {
      let user = await User.findOne({ email });
      if (!user) {
        const [firstName, lastName] = name.split(" ");
        user = await User.create({
          firstName,
          lastName,
          email,
          username: login,
          profilePhoto: avatar_url,
          password: await bcrypt.hash("", saltRounds),
          socialNet: true,
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

export const facebook = (req, res) => {
  const config = {
    client_id: process.env.FACEBOOK_ID,
    redirect_uri: `http://localhost:${process.env.PORT}/users/facebook/callback`,
    scope: "email public_profile",
    auth_type: "rerequest",
    state: "{st=state123abc,ds=123456789}",
  };
  const params = new URLSearchParams(config).toString();
  const url = `https://www.facebook.com/v13.0/dialog/oauth?${params}`;
  return res.redirect(url);
};

export const facebookCallback = async (req, res) => {
  let config = {
    client_id: process.env.FACEBOOK_ID,
    redirect_uri: `http://localhost:${process.env.PORT}/users/facebook/callback`,
    client_secret: process.env.FACEBOOK_SECRET,
    code: req.query.code,
  };
  let params = new URLSearchParams(config).toString();
  let url = `https://graph.facebook.com/v13.0/oauth/access_token?${params}`;

  const response = await (await fetch(url)).json();

  if ("access_token" in response) {
    const { access_token } = response;

    config = {
      access_token,
      fields: "email,first_name,last_name,picture",
    };
    params = new URLSearchParams(config).toString();
    url = `https://graph.facebook.com/v13.0/me?${params}`;

    const { email, first_name, last_name, picture } = await (
      await fetch(url)
    ).json();

    try {
      let user = await User.findOne({ email });
      if (!user) {
        user = await User.create({
          firstName: first_name,
          lastName: last_name,
          email,
          profilePhoto: picture.data.url,
          password: await bcrypt.hash("", saltRounds),
          socialNet: true,
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

export const naver = (req, res) => {
  const config = {
    response_type: "code",
    client_id: process.env.NAVER_ID,
    redirect_uri: `http://localhost:${process.env.PORT}/users/naver/callback`,
    state: "RANDOM_STATE",
  };
  const params = new URLSearchParams(config).toString();
  const url = `https://nid.naver.com/oauth2.0/authorize?${params}`;
  return res.redirect(url);
};

export const naverCallback = async (req, res) => {
  const config = {
    grant_type: "authorization_code",
    client_id: process.env.NAVER_ID,
    client_secret: process.env.NAVER_SECRET,
    redirect_uri: `http://localhost:${process.env.PORT}/users/naver/callback`,
    code: req.query.code,
    state: req.query.state,
  };
  const params = new URLSearchParams(config).toString();
  const url = `https://nid.naver.com/oauth2.0/token?${params}`;
  const response = await (await fetch(url)).json();

  if ("access_token" in response) {
    const { access_token } = response;

    const {
      response: { email, name },
    } = await (
      await fetch("https://openapi.naver.com/v1/nid/me", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
    ).json();

    try {
      let user = await User.findOne({ email });
      if (!user) {
        user = await User.create({
          email,
          username: name,
          password: await bcrypt.hash("", saltRounds),
          socialNet: true,
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

export const kakao = (req, res) => {
  const config = {
    client_id: process.env.KAKAO_ID,
    redirect_uri: `http://localhost:${process.env.PORT}/users/kakao/callback`,
    response_type: "code",
  };
  const params = new URLSearchParams(config).toString();
  const url = `https://kauth.kakao.com/oauth/authorize?${params}`;
  return res.redirect(url);
};

export const kakaoCallback = async (req, res) => {
  const config = {
    grant_type: "authorization_code",
    client_id: process.env.KAKAO_ID,
    redirect_uri: `http://localhost:${process.env.PORT}/users/kakao/callback`,
    code: req.query.code,
    client_secret: process.env.KAKAO_SECRET,
  };
  const params = new URLSearchParams(config).toString();
  const url = `https://kauth.kakao.com/oauth/token?${params}`;
  const response = await (
    await fetch(url, {
      method: "post",
      headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    })
  ).json();

  if ("access_token" in response) {
    const { access_token } = response;

    const {
      properties: { profile_image },
      kakao_account: {
        email,
        profile: { nickname },
      },
    } = await (
      await fetch("https://kapi.kakao.com/v2/user/me", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
    ).json();

    try {
      let user = await User.findOne({ email });
      if (!user) {
        user = await User.create({
          email,
          username: nickname,
          password: await bcrypt.hash("", saltRounds),
          profilePhoto: profile_image,
          socialNet: true,
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

export const google = (req, res) => {
  const config = {
    client_id: process.env.GOOGLE_CLIENT,
    response_type: "code",
    state: "state_parameter_passthrough_value",
    scope:
      "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email",
    access_type: "offline",
    redirect_uri: `http://localhost:${process.env.PORT}/users/google/callback`,
    prompt: "consent",
    include_granted_scopes: true,
  };
  const params = new URLSearchParams(config).toString();
  const url = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
  return res.redirect(url);
};

export const googleCallback = async (req, res) => {
  const config = {
    code: req.query.code,
    client_id: process.env.GOOGLE_CLIENT,
    client_secret: process.env.GOOGLE_SECRET,
    redirect_uri: `http://localhost:${process.env.PORT}/users/google/callback`,
    grant_type: "authorization_code",
  };
  const params = new URLSearchParams(config).toString();
  const url = `https://oauth2.googleapis.com/token?${params}`;
  const response = await (
    await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
  ).json();

  if ("access_token" in response) {
    const { access_token } = response;

    const { email, given_name, family_name } = await (
      await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
    ).json();

    try {
      let user = await User.findOne({ email });
      if (!user) {
        user = await User.create({
          firstName: given_name,
          lastName: family_name,
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

export const getEditProfile = async (req, res) => {
  const {
    params: { id },
    session: { user },
  } = req;
  // 현재 접속한 유저의 id와 수정하려는 유저의 id와 같은지 체크
  if (!(await User.findById(id)) || user._id !== id) {
    return res.redirect("/");
  }
  // 현재 접속한 유저와 수정하려는 유저가 같다.
  return res.render("editProfile");
};

export const postEditProfile = async (req, res) => {
  const {
    params: { id },
    session: { user },
  } = req;

  if (!(await User.findById(id)) || user._id !== id) {
    return res.redirect("/");
  }
  // TODO: 프론트엔드로 수정사항 처리
  // fetch()
};
