const router = require("express").Router();
const likeController = require("../controller/likeController");
const tokenVerification = require("../middleware/verify-token");
const checkProfilePrivacy = require("../middleware/check-profile-privacy");

router.post(
  "/:postId",
  [tokenVerification, checkProfilePrivacy],
  likeController.likePost
);

const likeRoutes = router;

module.exports = likeRoutes;
