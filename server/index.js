const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { User } = require("./models/User");
const { Post } = require("./models/Post");
const { Comment } = require("./models/Comment");
const config = require("./config/key");
const { auth } = require("./middleware/auth");

const cors = require("cors");
app.use(
  cors({
    origin: [
      "https://myblog-fullstack.onrender.com",
      "https://my-blog-client-sigma.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"], // 필요한 HTTP 메서드
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//mongoose연결
mongoose
  .connect(config.mongoURI)
  .then(() => {
    console.log("mongoDB connected");
  })
  .catch((err) => {
    console.log("error" + err);
  });

//배포 서버 연결 테스트
app.get("/api/endpoint", (req, res) => {
  // 요청을 처리하는 로직
  res.json({ message: "Hello from the server!" });
});

//기본 예시
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//회원가입 Post 라우터
app.post("/api/users/register", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => {
      console.log(`${req.body.name}님께서 회원가입 하셨습니다!`);
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
        throw new Error("There is no user whose email is the email.");
      }
      const isMatch = await user.comparePassword(req.body.password);
      return { isMatch, user };
    })
    .then(({ isMatch, user }) => {
      if (!isMatch) {
        throw new Error("Password is incorrect.");
      }
      //로그인 완료
      return user.generateToken();
    })
    .then((user) => {
      //토큰을 클라이언트의 쿠키에 저장한다.
      return res
        .cookie("x_auth", user.token, {
          httpOnly: true, // 클라이언트에서 쿠키에 접근할 수 없음
          secure: true, // HTTPS에서만 쿠키가 전송됨 (배포 환경에서 true)
          sameSite: "None", // CSRF 공격 방지를 위해 설정
        })
        .status(200)
        .json({
          loginSuccess: true,
          userId: user._id,
        });
    })
    .catch((err) => {
      return res.status(400).json({
        loginSuccess: false,
        message: err.message,
      });
    });
});

app.get("/api/users/auth", auth, (req, res) => {
  //auth라는 쿠키의 토큰을 확인하는 미들웨어를 지나야 페이지 라우터 실행.
  res.status(200).json({
    //여기 이 데이터들의 정체는,
    //auth로 권한을 확인 받은 res를 위해 주는 유저의 데이터!
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  //이 함수는 mongoose스키마가 지원하는 기능으로
  //두 개의 객체를 받아서 첫 번째 속성을 가진 data의
  //두 번째 객체의 속성값으로 설정한다.
  User.findOneAndUpdate(
    {
      _id: req.user._id,
    },
    {
      token: "",
    }
  )
    .then(() => {
      res.clearCookie("x_auth", {
        //챗지피티가 알려준 쿠키 보호 시스템
        httpOnly: true, // 클라이언트 JavaScript에서 쿠키에 접근하지 못하게 설정
        secure: true, // HTTPS에서만 쿠키를 전송하도록 설정
        sameSite: "Strict", // CSRF 공격 방지를 위해 설정
      });
      return res.status(200).json({
        logoutSuccess: true,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        logoutSuccess: false,
        message: err.message,
      });
    });
});

app.get("/api/post/load", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const query = req.query.query || "";
  const limit = page * 9; // 페이지 번호에 따라 증가하는 limit
  const skip = 0; // 항상 처음부터 로드

  try {
    // 검색어가 있다면 제목 또는 내용에 포함된 포스트를 찾습니다.
    const filter = query
      ? {
          $or: [
            { title: { $regex: query, $options: "i" } },
            { content: { $regex: query, $options: "i" } },
            { writer: { $regex: query, $options: "i" } },
          ],
        }
      : {};
    const totalPosts = await Post.countDocuments(filter);

    const posts = await Post.find(filter)
      .sort({ createdDate: -1 })
      .skip(skip)
      .limit(limit);
    const isLastPage = skip + limit >= totalPosts;

    res.status(200).json({ posts, totalPosts, isLastPage });
  } catch (err) {
    res.status(500).json({ error: "Load Failed", err });
  }
});

//Post
app.post("/api/post/new", (req, res) => {
  const post = new Post(req.body);
  console.log(post);
  post
    .save()
    .then(() => {
      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      return res.json({ success: false, err: err.message });
    });
});

app.post("/api/post/edit", async (req, res) => {
  Post.findOneAndUpdate(
    { _id: req.body._id },
    {
      title: req.body.title,
      content: req.body.content,
      createdDate: req.body.createdDate,
    }
  )
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      res.status(400).json({ message: "Can't Edit", err });
    });
});

app.delete("/api/post/delete/:_id", async (req, res) => {
  const postId = req.params._id;

  try {
    // 1. 해당 포스트에 달린 댓글들 삭제
    await Comment.deleteMany({ postId });

    // 2. 포스트 삭제
    await Post.deleteOne({ _id: postId });

    res.status(200).json({
      success: true,
      message: "Post and its comments deleted successfully.",
    });
  } catch (err) {
    res.status(400).json({ message: "삭제 실패", err });
  }
});

app.get("/api/post/:_id/comments", async (req, res) => {
  try {
    const postId = req.params._id;

    // 해당 게시물의 모든 댓글 가져오기
    const comments = await Comment.find({ postId }).sort({ createdAt: -1 }); // 최신순 정렬

    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to load comments" });
  }
});

app.post("/api/post/:_id/comment/new", async (req, res) => {
  try {
    const postId = req.params._id;
    const { writer, content, createdDate, writerCode } = req.body;
    console.log(req.params._id);
    const newComment = new Comment({
      postId,
      writer,
      writerCode,
      content,
      createdDate,
    });
    console.log(newComment);
    await newComment.save();

    await Post.findByIdAndUpdate(postId, { $inc: { commentCount: 1 } });

    res.status(201).json(newComment);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "faild to create comment" });
  }
});

app.delete("/api/comment/delete/:_id", async (req, res) => {
  const comment = await Comment.findById(req.params._id);
  if (!comment) {
    return res.status(404).json({ message: "You can't delete it" });
  }
  try {
    // 2. 포스트 삭제
    await Comment.deleteOne({ _id: comment._id });

    await Post.findByIdAndUpdate(comment.postId, {
      $inc: { commentCount: -1 },
    });
    res.status(200).json({
      success: true,
      message: "Post and its comments deleted successfully.",
    });
  } catch (err) {
    res.status(400).json({ message: "삭제 실패", err });
  }
});
