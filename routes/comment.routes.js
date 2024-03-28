const commentController = require("../controller/commentController");
const checkProfilePrivacy = require("../middleware/check-profile-privacy");
const tokenVerification = require("../middleware/verify-token");

const router = require("express").Router();

router.post(
  "/:postId",
  [tokenVerification, checkProfilePrivacy],
  commentController.addComment
);
router.post(
  "/:postId/:commentId",
  [tokenVerification, checkProfilePrivacy],
  commentController.addReply
);

const commentRoutes = router;

module.exports = commentRoutes;
