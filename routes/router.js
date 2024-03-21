const router = require("express").Router();
const authRoutes = require("./auth.routes");
const uploadRoutes = require("./upload.routes");
const profileRoutes = require("./profile.routes");
const postRoutes = require("./post.routes");
const likeRoutes = require("./like.routes");
const commentRoutes = require("./comment.routes");
const userRouters = require("./user.routes");

router.use("/auth", authRoutes);
router.use("/user", userRouters);
router.use("/profile", profileRoutes);
router.use("/uploads", uploadRoutes);
router.use("/posts", postRoutes);
router.use("/likes", likeRoutes);
router.use("/comments", commentRoutes);

module.exports = router;
