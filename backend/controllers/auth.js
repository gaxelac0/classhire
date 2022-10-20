var User = require('../models/user.model')
var Profile = require('../models/profile.model')
var jwt = require('jsonwebtoken')
var constants = require('../utils/constants')

exports.signup = async function signup(req, res) {
  User.findOne({ email: req.body.email })
  .then(user => {
    if (user) {
      throw new Error('Account already exists')
    } else if (!process.env.SECRET) {
      throw new Error('no SECRET in .env file')
    } else {
      req.body.role = constants.RoleEnum[0];
      Profile.create(req.body)
      .then(newProfile => {
        req.body.profile = newProfile._id
        User.create(req.body)
        .then(user => {
          const token = createJWT({user, profile: newProfile})
          res.status(200).json({ token })
        })
        .catch(err => {
          Profile.findByIdAndDelete(req.body.profile)
          res.status(500).json({ err: err.errmsg })
        })
      })
    }
  })
  .catch(err => {
    res.status(500).json({ err: err.message })
  })
}

exports.login = async function login(req, res) {
  User.findOne({ email: req.body.email })
  .then(user => {
    if (!user) return res.status(401).json({ err: 'User not found' })
    user.comparePassword(req.body.password, async (err, isMatch) => {
      if (isMatch) {
        let profile = await Profile.findOne(user.profile);
        const token = createJWT({user, profile});
        res.json({ token })
      } else {
        res.status(401).json({ err: 'Incorrect user or password' })
      }
    })
  })
  .catch(err => {
    res.status(500).json(err)
  })
}

exports.changePassword = async function changePassword(req, res) {
  User.findById(req.user._id)
  .then(user => {
    if (!user) return res.status(401).json({ err: 'User not found' })
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch) {
        user.password = req.body.newPw
        user.save()
        .then(async () => {
          let profile = await Profile.findOne(user.profile);
          const token = createJWT({user,profile})
          res.json({ token })
        })
      } else {
        res.status(401).json({ err: 'Incorrect user or password' })
      }
    })
  })
}

/* --== Helper Functions ==-- */

function createJWT(userDetails) {
  return jwt.sign(userDetails, process.env.SECRET, { expiresIn: '24h' })
}
exports.createJWT = createJWT;

