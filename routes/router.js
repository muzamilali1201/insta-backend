const router = require("express").Router();
const authRoutes = require("./auth.routes");
const uploadRoutes = require("./upload.routes");
const profileRoutes = require("./profile.routes");
const followRoutes = require("./follow.routes");

router.use("/user", authRoutes);
router.use("/profile", profileRoutes);
router.use("/uploads", uploadRoutes);
router.use("/follow", followRoutes);

module.exports = router;
