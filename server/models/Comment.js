const mongoose = require("mongoose");
const { Post } = require("./Post");
const { User } = require("./User");

const commentSchema = mongoose.Schema({
  content: {
    type: String,
  },
  writer: {
    type: String,
  },
  writerCode: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Post,
    required: true,
  },
  createdDate: {
    type: Number,
  },
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = { Comment };
