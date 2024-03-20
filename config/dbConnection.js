const mongoose = require("mongoose");

const dbConnection = async () => {
  return await mongoose.connect(process.env.DB_URL);
};

module.exports = dbConnection;
