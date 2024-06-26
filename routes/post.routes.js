const router = require("express").Router();
const postController = require("../controller/postController");
const checkProfilePrivacy = require("../middleware/check-profile-privacy");
const joiSchemaValidation = require("../middleware/schema-validation");
const tokenVerification = require("../middleware/verify-token");
const { postValidation } = require("../validation/joiValidation");

router.post(
  "/",
  [tokenVerification, joiSchemaValidation(postValidation)],
  postController.create
);
router.get("/", [tokenVerification], postController.getAll);
router.get(
  "/:userId",
  [tokenVerification, checkProfilePrivacy],
  postController.getSpecificPost
);

const postRoutes = router;
module.exports = postRoutes;
