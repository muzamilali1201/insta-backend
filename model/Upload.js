const mongoose = require("mongoose");

module.exports = mongoose.model(
  "Upload",
  mongoose.Schema({
    userId: String,
    fileName: String,
    url: String,
    type: String,
  })
);
