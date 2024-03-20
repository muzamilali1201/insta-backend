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
      url: String,
      required: true,
    },
    likes: {
      type: mongoose.Schema.ObjectId,
      ref: "Auth",
    },
    comments: {
      type: mongoose.Schema.ObjectId,
      ref: "Auth",
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  })
);
