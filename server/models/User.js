const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const util = require("util");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minLength: 5,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

//save의 pre미들웨어를 설정하는 작업이다.
//bcrypt는 s
userSchema.pre("save", function (next) {
  var user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

//간단한 bcrypt를 이용한 비밀번호 비교 메소드다.
//bcrypt의 compare메소드를 활용한다.
//해쉬를 고려해서 자동적으로 비교해준다.
userSchema.methods.comparePassword = function (plainPassword) {
  const user = this;
  return bcrypt.compare(plainPassword, this.password);
};

//토큰을 만드는 것으로 JSON Web Token을 활용한다.
userSchema.methods.generateToken = function () {
  user = this;
  const token = jwt.sign(user._id.toJSON(), "secretToken");
  user.token = token;
  console.log(user, user.token);
  return user.save();
};

//토큰을 통해 유저를 찾는 것이다.
//현재 스키마에 유저가 토큰을 가지고 있는지
//판단하고 가지고 있다면 넘긴다.
userSchema.statics.findByToken = function (token) {
  const user = this;
  return util
    .promisify(jwt.verify)(token, "secretToken")
    .then((decoded) => {
      return user.findOne({
        _id: decoded,
        token: token,
      });
    })
    .catch((err) => {
      console.log(err);
      throw new Error("유효하지 않은 토큰입니다.");
    });
};
const User = mongoose.model("User", userSchema);
module.exports = { User };
