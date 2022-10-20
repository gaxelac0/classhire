var User = require('../models/user.model')
var Profile = require('../models/profile.model')
var jwt = require('jsonwebtoken')

exports.signup = async function signup(req, res) {
  User.findOne({ email: req.body.email })
  .then(user => {
    if (user) {
      throw new Error('Account already exists')
    } else if (!process.env.SECRET) {
      throw new Error('no SECRET in .env file')
    } else {
      Profile.create(req.body)
      .then(newProfile => {
        req.body.profile = newProfile._id
        User.create(req.body)
        .then(user => {
          const token = createJWT(user)
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
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(user)
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
        .then(() => {
          const token = createJWT(user)
          res.json({ token })
        })
      } else {
        res.status(401).json({ err: 'Incorrect user or password' })
      }
    })
  })
}

/* --== Helper Functions ==-- */

function createJWT(user) {
  return jwt.sign({ user }, process.env.SECRET, { expiresIn: '24h' })
}
exports.createJWT = createJWT;

