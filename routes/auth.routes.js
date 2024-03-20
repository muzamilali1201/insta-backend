const authController = require("../controller/authController");

const router = require("express").Router();

router.post("/signup", authController.signupUser);
router.post("/login", authController.loginUser);
router.post("/password-reset", authController.sendPasswordResetLink);
router.get("/password-reset", authController.resetPassword);

const authRoutes = router;
module.exports = router;
