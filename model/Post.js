const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Post",
  mongoose.Schema({
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "Auth",
      required: true,
    },
    caption: String,
    media: {
      type: String,
      enum: ["image", "video"],
      required: true,
    },

    url: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Number,
      default: 0,
    },
    score: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  })
);
