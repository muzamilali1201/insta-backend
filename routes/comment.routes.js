const commentController = require("../controller/commentController");
const tokenVerification = require("../middleware/verify-token");

const router = require("express").Router();

router.post("/:postId", [tokenVerification], commentController.addComment);

const commentRoutes = router;

module.exports = commentRoutes;
