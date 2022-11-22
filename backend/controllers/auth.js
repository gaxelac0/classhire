var User = require("../models/user.model");
var Profile = require("../models/profile.model");
var constants = require("../utils/constants");

var authService = require("../services/auth.service");

var nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const { google } = require("googleapis");

const oAuth2Client = new google.auth.OAuth2(
  process.env.GMAIL_API_KEY,
  process.env.GMAIL_API_SECRET,
  process.env.GMAIL_API_REDIRECT_URI
);

oAuth2Client.setCredentials({
  refresh_token: process.env.GMAIL_API_REFRESH_TOKEN,
});

exports.signup = async function signup(req, res) {
  // Role vacio, luego sera completado en el complete onboard
  req.body.role = constants.RoleEnum[0];

  try {
    let token = await authService.signUp(req.body);
    return res.status(200).json({ ok: true, token: token });
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ ok: false, errors: { error: { msg: e.message } } });
  }
};

exports.login = async function login(req, res) {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user)
        return res
          .status(401)
          .json({
            ok: false,
            errors: {
              error: { msg: "Credenciales incorrectas o inexistentes" },
            },
          });
      user.comparePassword(req.body.password, async (err, isMatch) => {
        if (isMatch) {
          let profile = await Profile.findOne({ _id: user.profile._id });
          const token = authService.createJWT({
            user: user,
            role: profile.role,
          });
          return res.json({ ok: true, token: token });
        } else {
          return res
            .status(401)
            .json({
              ok: false,
              errors: {
                error: { msg: "Credenciales incorrectas o inexistentes" },
              },
            });
        }
      });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

exports.changePassword = async function changePassword(req, res) {


  const token = req.params.token;

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res
      .status(401)
      .json({ err: "error decrypt token" });
    } else {
      req.user_id = decoded.user_id;
    }
  });

  User.findById(req.user_id).then(async (user) => {
    if (!user) {
      return res
        .status(401)
        .json({ err: "Credenciales incorrectas o inexistentes" });

    }

    if (req.body.new_password !== req.body.confirmation_new_password) {
      return res
      .status(401)
      .json({ err: "Las contrasenas no coinciden" }); 
    }
    
  
      user.password = req.body.new_password;
      user.save();


      
      let profile = await Profile.findOne({ _id: user.profile._id });
      const token = authService.createJWT({
        user: user,
        role: profile.role,
      });
      
      return res.json({ ok: true, token: token });
  });
};

exports.forgotPassword = async function forgotPassword(req, res) {
  await User.findOne({ email: req.body.email }).then(async (user) => {
    if (!user) {
      return res
        .status(401)
        .json({ err: "Credenciales incorrectas o inexistentes" });
    }

    const accessToken = await oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        ...constants.auth,
        accessToken: accessToken,
      },
    });

    const token = authService.createJWT({
      user_id: user._id,
    });

    const mailOptions = {
      ...constants.mailoptions,
      from: "classhire",
      to: req.body.email,
      text:
        `Hola! Te escribimos de Classhire. \n
        Alguien ha solicitado una actualizacion de contrasena para esta cuenta, si no fuiste tu ignora este mail. \n
        Sigue este link: http://localhost:3000/changePassword/` +     token,
    };

    try {
      const result = await transport.sendMail(mailOptions);
      return res.send(result);
    } catch (error) {
      console.log(error);
      res.send(error);
    }

    // enviar por mail

    // responder success siempre
    return res.json({ status: "ok", msg: " processed without errors" });
  });
};
