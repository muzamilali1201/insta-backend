const userController = require("../controller/userController");
const checkProfilePrivacy = require("../middleware/check-profile-privacy");
const tokenVerification = require("../middleware/verify-token");

const router = require("express").Router();

router.post("/password-reset", userController.sendPasswordResetLink);
router.put("/password-reset", userController.resetPassword);
router.get(
  "/followers/:userId",
  [tokenVerification, checkProfilePrivacy],
  userController.getFollowersOfUser
);
router.get(
  "/followings/:userId",
  [tokenVerification, checkProfilePrivacy],
  userController.getFollowingsOfUser
);
router.post("/follow/:userId", [tokenVerification], userController.followUser);

const userRouter = router;

module.exports = userRouter;
