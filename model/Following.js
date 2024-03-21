const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Following",
  mongoose.Schema({
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "Auth",
    },
    following: {
      type: mongoose.Schema.ObjectId,
      ref: "Auth",
    },
  })
);
