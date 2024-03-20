const followController = require("../controller/followController");
const tokenVerification = require("../middleware/verify-token");

const router = require("express").Router();

router.post("/:userId", [tokenVerification], followController.followUser);

const followRoutes = router;
module.exports = followRoutes;
