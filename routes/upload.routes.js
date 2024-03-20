const uploadController = require("../controller/uploadController");
const upload = require("../middleware/upload");
const tokenVerification = require("../middleware/verify-token");

const router = require("express").Router();

router.post(
  "/",
  [tokenVerification, upload.single("file")],
  uploadController.uploadFile
);
const uploadRoutes = router;
module.exports = uploadRoutes;
