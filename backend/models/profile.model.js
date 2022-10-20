var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var RoleEnum = require('../utils/constants').RoleEnum;

var profileSchema = new mongoose.Schema({
  name: String,
  photo: { type: String } /* base 64 */, 
  clases: [{type: mongoose.Schema.Types.ObjectId, ref: 'Clase'}],
  role: {type: String, enum: RoleEnum}
},{
  timestamps: true,
})

profileSchema.plugin(mongoosePaginate)
var Profile = mongoose.model('Profile', profileSchema)

module.exports = Profile;