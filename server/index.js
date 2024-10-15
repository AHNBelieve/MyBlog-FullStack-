const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 5000;
const { User } = require("./models/User");

//mongoose연결
mongoose
  .connect("URI 나중에 넣어라.")
  .then(() => {
    console.log("mongoDB connected");
  })
  .catch((err) => {
    console.log("error" + err);
  });

//기본 예시
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//회원가입 Post 라우터
app.post("api/users/register", (req, res) => {
  const user = new User(req.body);

  user
    .save()
    .then(() => {
      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      return res.json({ success: false, err });
    });
});

//포트 연결
app.listen(port, () => {
  //listen의 역할은 해당 포트에서 클라이언트의 HTTP요청 대기!
  //요청을 받으면 정해진 라우터와 미들웨어에 따라 처리!

  console.log(`포트 ${port} 에서 실행중`);
});

app.post("/api/users/login", (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .then(async (user) => {
      if (!user) {
        throw new Error("제공된 이메일에 해당하는 유저가 없습니다..!");
      }
      const isMatch = await user.comparePassword(req.body.password);
      return { isMatch, user };
    })
    .then((isMatch, user) => {
      console.log(isMatch);
      if (!isMatch) {
        throw new Error("비밀번호가 틀렸습니다.");
      }
      //로그인 완료
      return user.generateToken();
    })
    .then((user) => {
      //토큰을 클라이언트의 쿠키에 저장한다.
      return res.cookie("x_auth", user.token).status(200).json({
        loginSuccess: true,
        userId: user._id,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({
        loginSuccess: false,
        message: err.message,
      });
    });
});
