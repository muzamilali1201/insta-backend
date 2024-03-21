const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Comment",
  mongoose.Schema({
    postId: String,
    text: String,
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "Auth",
    },
    repliedTo: {
      type: mongoose.Schema.ObjectId,
      ref: "Auth",
      default: null,
    },
  })
);
