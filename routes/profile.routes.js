const profileController = require("../controller/profileController");
const tokenVerification = require("../middleware/verify-token");

const router = require("express").Router();

router.post("/", [tokenVerification], profileController.createProfile);
router.put("/", [tokenVerification], profileController.updateProfile);

const profileRoutes = router;
module.exports = profileRoutes;
