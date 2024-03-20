const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Profile",
  mongoose.Schema({
    userId: String,
    name: String,
    bio: String,
    gender: String,
    location: String,
    interests: String,
    contact: String,
    profilePicture: {
      type: String,
      default: null,
    },
    followers: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
    followersCount: {
      type: Number,
      default: 0,
    },
    followingCount: {
      type: Number,
      default: 0,
    },
  })
);
