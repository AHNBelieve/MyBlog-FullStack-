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
});

const Post = mongoose.model("Post", postSchema);
module.exports = { Post };
