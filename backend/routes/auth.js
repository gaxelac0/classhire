const express = require("express");
const authCtrl = require("../controllers/auth.js");
const decodeUserFromToken =
  require("../middleware/auth.js").decodeUserFromToken;
const checkAuth = require("../middleware/auth.js").checkAuth;
const check = require("express-validator").check;
const validateField = require("../middleware/field_validator.js").validateField;

var router = express.Router();

/*---------- Public Routes ----------*/
router.post(
  "/signup",
  [
    check("email", "Un mail valido es obligatorio").isEmail(),
    check("firstName", "El nombre es obligatorio").not().isEmpty(),
    check("lastName", "El apellido es obligatorio").not().isEmpty(),
    check("password", "La contrasena es obligatoria").not().isEmpty(),
    validateField,
  ],
  authCtrl.signup
);

router.post(
  "/login",
  [
    check("email", "Un mail valido es obligatorio").isEmail(),
    check("password", "La contrasena es obligatoria").not().isEmpty(),
    validateField,
  ],
  authCtrl.login
);

/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken);
router.post("/changePassword", checkAuth, authCtrl.changePassword);

module.exports = router;
