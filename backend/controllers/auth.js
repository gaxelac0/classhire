var User = require("../models/user.model");
var Profile = require("../models/profile.model");
var constants = require("../utils/constants");

var authService = require("../services/auth.service");

exports.signup = async function signup(req, res) {
  // Role vacio, luego sera completado en el complete onboard
  req.body.role = constants.RoleEnum[0];

  try {
    let token = await authService.signUp(req.body);
    return res.status(200).json({ ok: true, token: token });
  } catch (e) {
    return res.status(e.statusCode).json({ ok: false, errors: {error: {msg: e.message}} });
  }
};

exports.login = async function login(req, res) {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user)
        return res.status(401).json({ok: false, errors: {error: {msg: "Credenciales incorrectas o inexistentes"}}});
      user.comparePassword(req.body.password, async (err, isMatch) => {
        if (isMatch) {
          let profile = await Profile.findOne({ _id: user.profile._id });
          const token = authService.createJWT({
            user: user,
            role: profile.role,
          });
          return res.json({ ok: true, token: token });
        } else {
          return res.status(401).json({ ok: false, errors: {error: {msg: "Credenciales incorrectas o inexistentes"}}});
        }
      });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

exports.changePassword = async function changePassword(req, res) {
  User.findById(req.user._id).then((user) => {
    if (!user)
      return res.status(401).json({ err: "Credenciales incorrectas o inexistentes" });
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch) {
        user.password = req.body.newPw;
        user.save().then(async () => {
          let profile = await Profile.findOne({ _id: user.profile._id });
          const token = authService.createJWT({
            user: user,
            role: profile.role,
          });
          res.json({ token });
        });
      } else {
        res.status(401).json({ err: "Credenciales incorrectas o inexistentes" });
      }
    });
  });
};
