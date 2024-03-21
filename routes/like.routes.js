const router = require("express").Router();
const likeController = require("../controller/likeController");
const tokenVerification = require("../middleware/verify-token");

router.post("/:postId", [tokenVerification], likeController.likePost);

const likeRoutes = router;

module.exports = likeRoutes;
