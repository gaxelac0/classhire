var Profile = require("../models/profile.model");
var cloudinary = require("cloudinary").v2;

var profileService = require("../services/profile.service");
var authService = require("../services/auth.service");

exports.getProfiles = async function getProfiles(req, res) {
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 10;

  try {
    let profiles = await profileService.getProfiles({}, page, limit);
    return res.status(200).json({ status: "ok", data: profiles });
  } catch (e) {
    return res.status(400).json({ status: "err", message: e.message });
  }
};

exports.getProfileById = async function getProfileById(req, res) {
  query = {};
  query["_id"] = { $eq: req.params.id };

  try {
    let profiles = await profileService.getProfiles(query, 1, 1);
    return res.status(200).json({ status: "ok", data: profiles });
  } catch (e) {
    return res.status(400).json({ status: "err", message: e.message });
  }
};

exports.setRole = async function setRole(req, res) {
  try {
    req.body.profile = req.user.profile;
    let profile = await profileService.setRole(req.body);

    const token = authService.createJWT({ user: req.user, role: profile.role });

    return res.status(200).json({ status: "ok", data: profile, token: token });
  } catch (e) {
    return res
      .status(e.statusCode)
      .json({ status: e.name, message: e.message });
  }
};

exports.addPhoto = async function addPhoto(req, res) {
  const imageFile = req.files.photo.path;
  Profile.findById(req.params.id).then((profile) => {
    cloudinary.uploader
      .upload(imageFile, { tags: `${profile.email}` })
      .then((image) => {
        profile.photo = image.url;
        profile.save().then((profile) => {
          res.status(201).json(profile.photo);
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
};
