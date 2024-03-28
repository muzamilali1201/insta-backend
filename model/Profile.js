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
    profileType: {
      type: String,
      default: "public",
      required: true,
    },
    followers: {
      type: Number,
      default: 0,
    },
    following: {
      type: Number,
      default: 0,
    },
  })
);
