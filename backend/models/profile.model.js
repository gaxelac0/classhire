var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var aggregatePaginate = require('mongoose-aggregate-paginate-v2');

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
profileSchema.plugin(aggregatePaginate);
var Profile = mongoose.model('Profile', profileSchema)

module.exports = Profile;