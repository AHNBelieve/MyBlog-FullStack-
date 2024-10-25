const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: 1,
  },
  title: {
    type: String,
    maxlength: 50,
    minLength: 1,
  },
  content: {
    type: String,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("Post", postSchema);
module.exports = { Post };
