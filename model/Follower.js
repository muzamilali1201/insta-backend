const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Follower",
  mongoose.Schema({
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "Auth",
    },
    follower: {
      type: mongoose.Schema.ObjectId,
      ref: "Auth",
    },
  })
);
