var mongoose = require('mongoose');

var profileSchema = new mongoose.Schema({
  name: String,
  photo: { type: String } /* base 64 */, 
  clases: [{type: mongoose.Schema.Types.ObjectId, ref: 'Clase'}],
},{
  timestamps: true,
})

var Profile = mongoose.model('Profile', profileSchema)

module.exports = Profile;