const userController = require("../controller/userController");
const tokenVerification = require("../middleware/verify-token");

const router = require("express").Router();

router.post("/password-reset", userController.sendPasswordResetLink);
router.put("/password-reset", userController.resetPassword);
router.get("/followers/:userId", userController.getFollowersOfUser);
router.get("/followings/:userId", userController.getFollowingsOfUser);
router.post("/follow/:userId", [tokenVerification], userController.followUser);

const userRouter = router;

module.exports = userRouter;
