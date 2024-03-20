const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Token",
  mongoose.Schema({
    userId: String,
    token: String,
  })
);
