const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: {
    type: String,
    maxlength: 50,
    minLength: 1,
  },
  content: {
    type: String,
  },
  createdDate: {
    type: Number,
  },
  writer: {
    type: String,
  },
  writerCode: {
    type: mongoose.Schema.Types.ObjectId,
  },
  commentCount: {
    type: Number,
  },
});

const Post = mongoose.model("Post", postSchema);
module.exports = { Post };
