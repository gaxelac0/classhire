import { Clase } from '../models/clase.js'
import { Profile } from '../models/profile.js'
import { User } from '../models/user.js'

function index(req, res) {
  Clase.find({})
    .then(clases => res.json(clases))
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
}

function addClase(req, res) {
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
              res.status(500).json({ err: err.errmsg })
            })
        })
        .catch(err => {
          Clase.findByIdAndDelete(newClase._id)
          res.status(500).json({ err: err.errmsg })
        })
    })
    .catch(err => {
      res.status(500).json({ err: err.message })
    })

}

export { index, addClase }
