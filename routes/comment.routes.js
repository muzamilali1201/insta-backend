const commentController = require("../controller/commentController");
const tokenVerification = require("../middleware/verify-token");

const router = require("express").Router();

router.post("/:postId/", [tokenVerification], commentController.addComment);
router.post(
  "/:postId/:commentId",
  [tokenVerification],
  commentController.addReply
);

const commentRoutes = router;

module.exports = commentRoutes;
