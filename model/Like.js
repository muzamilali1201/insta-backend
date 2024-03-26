const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Like",
  mongoose.Schema({
    post: {
      type: mongoose.Schema.ObjectId,
      ref: "Post",
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "Auth",
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  })
);
