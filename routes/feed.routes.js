const feedController = require("../controller/feedController");
const router = require("express").Router();
const tokenVerification = require("../middleware/verify-token");

router.get("/", [tokenVerification], feedController.getFeed);

const feedRoutes = router;

module.exports = feedRoutes;
