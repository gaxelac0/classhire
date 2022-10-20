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
                res.status(200).json({status: "ok", msg: "Clase creada"})
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
  const body = req.body;

  const type = body.type;
  const comment = body.comment;

  claseService.getClaseById({_id: body.clase_id})
  .then(async clase => {

    clase.comments.push({type: type, comment: comment})
    clase.reviewCount = clase.reviewCount+1;

    let cantNeg = clase.reviewNegative;
    let cantPos = clase.reviewPositive;
    if (type === "positive") {
      cantPos = cantPos+1;
    } else {
      cantNeg = cantNeg+1;
    }
    clase.reviewPositive = cantPos;
    clase.reviewNegative = cantNeg;

    let percentage = (100 * cantPos) / clase.reviewCount;

    clase.rating = percentage/20;

    await clase.save()
    res.status(200).json({status: "ok", msg: "Review posteada"});

  })
  .catch(err => {
    res.status(400).json({status: "err", msg: err.message})
  })
  
}
