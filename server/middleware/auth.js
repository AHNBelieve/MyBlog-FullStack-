const { User } = require("../models/User");

const auth = (req, res, next) => {
  console.log(req.cookies);
  if (!req.cookies.x_auth) {
    return res
      .status(401)
      .json({ isAuth: false, message: "There is not token" });
  }
  const token = req.cookies.x_auth;
  //토큰 복호화 및 유저 검색
  User.findByToken(token)
    .then((user) => {
      if (!user) {
        throw new Error("유효하지 않은 토큰인디요?");
      }
      req.token = token;
      req.user = user;
      next();
    })
    .catch((err) => {
      return res.status(401).json({
        isAuth: false,
        message: err.message,
      });
    });
};

module.exports = { auth };
