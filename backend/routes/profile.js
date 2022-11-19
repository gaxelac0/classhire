const express = require("express");
const profileCtrl = require("../controllers/profile.js");
const decodeUserFromToken =
  require("../middleware/auth.js").decodeUserFromToken;
const checkAuth = require("../middleware/auth.js").checkAuth;

var router = express.Router();

/*---------- Public Routes ----------*/
router.get("/:id", profileCtrl.getProfileById);

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken);
router.get("/", checkAuth, profileCtrl.getProfiles);
router.patch("/", checkAuth, profileCtrl.patchProfile);
router.put("/:id/add-photo", checkAuth, profileCtrl.addPhoto);

module.exports = router;
