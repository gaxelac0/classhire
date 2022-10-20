var Clase = require('../models/clase.model')
var Profile = require('../models/profile.model')
var User = require('../models/user.model')

var claseService = require('../services/clase.service');

exports.index = async function index(req, res) {
  Clase.find({})
    .then(clases => res.json(clases))
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
}

exports.addClase = async function addClase(req, res) {
  const body = req.body

  Clase.create(body)
    .then(newClase => {
      User.findOne(req.user)
        .then(user => {

          Profile.findOne(user.profile)
            .then(profile => {
              profile.clases.push(newClase);
              console.log(profile.clases[0]);
              profile.save(function (err) {
                if (err) return handleError(err)
                console.log('Success!');
                res.status(200).json({ status: "ok", msg: "Clase creada" })
              });

            })
            .catch(err => {
              Clase.findByIdAndDelete(newClase._id)
              res.status(500).json({ err: err.message })
            })
        })
        .catch(err => {
          Clase.findByIdAndDelete(newClase._id)
          res.status(500).json({ err: err.message })
        })
    })
    .catch(err => {
      res.status(500).json({ err: err.message })
    })

}

exports.addReview = async function addReview(req, res) {
  try {
    const body = req.body;
    claseService.addReview(body.clase_id, body.type, body.comment)
    return res.status(200).json({ status: "ok", msg: "Review posteada" });
  } catch (e) { 
    return res.status(400).json({ status: "err", msg: err.message })
  }
}
