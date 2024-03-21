const authController = require("../controller/authController");
const tokenVerification = require("../middleware/verify-token");

const router = require("express").Router();

router.post("/signup", authController.signupUser);
router.post("/login", authController.loginUser);

const authRoutes = router;
module.exports = router;
