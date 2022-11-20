const express = require("express");

const claseCtrl = require("../controllers/clase.js");
const decodeUserFromToken =
  require("../middleware/auth.js").decodeUserFromToken;
const checkAuth = require("../middleware/auth.js").checkAuth;
const body = require("express-validator").body;
const FrecuenciaEnum = require("../models/clase.model").FrecuenciaEnum;

var router = express.Router();

/*---------- Public Routes ----------*/
router.post("/", claseCtrl.getClases);

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken);
router.post(
  "/add",
  //body('frecuencia').exists().notEmpty().isIn(FrecuenciaEnum), // TODO: check this validation
  checkAuth,
  claseCtrl.addClase
);

router.delete("/", checkAuth, claseCtrl.deleteClase);

router.post("/byprofile", checkAuth, claseCtrl.getClasesByProfileId);

router.post(
  "/review",
  checkAuth,
  body("id").exists().notEmpty(),
  body("type").exists().notEmpty(),
  body("comment").exists().notEmpty(),
  claseCtrl.addReview
);

router.post(
  "/contratacion",
  checkAuth,
  body("clase_id").exists().notEmpty(),
  claseCtrl.contratar
);

router.patch(
  "/contratacion",
  checkAuth,
  body("clase_id").exists().notEmpty(),
  body("profile_id").exists().notEmpty(),
  body("new_state").exists().notEmpty(),
  body("new_reason").exists().notEmpty(),
  claseCtrl.patchContratacion
);

module.exports = router;
