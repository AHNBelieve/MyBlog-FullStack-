const mongoose = require("mongoose");
const { Post } = require("./Post");

const commentSchema = mongoose.Schema({
  content: {
    type: String,
  },
  writer: {
    type: String,
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
