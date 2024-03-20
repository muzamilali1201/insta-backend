const express = require("express");
const dbConnection = require("./config/dbConnection");
const errorHandler = require("./middleware/error-handler");
require("dotenv").config();
require("express-async-errors");
const router = require("./routes/router");

dbConnection();
const app = express();
app.use("/public", express.static("public"));
app.use(express.json());
app.use("/api/v1", router);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});
