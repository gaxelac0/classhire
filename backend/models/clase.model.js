var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

const FrecuenciaEnum = ["unica", "diaria", "semanal", "mensual"];
var frecuenciaSchema = new mongoose.Schema({value: { type: String, enum: FrecuenciaEnum}});

var commentSchema = new mongoose.Schema({
  type: {type: String, required: true}, /* can be positive, negative, neutral */
  comment: {type: String, required: true},
  profile_author_id: {type: mongoose.Schema.Types.ObjectId, ref: "Profile"}
},{
timestamps: true,
});

var claseSchema = new mongoose.Schema({
    title: {type: String, required: true},
    price: {type: Number, required: true},
    rating: {type: Number, default: 0}, 
    reviewCount: {type: Number, default: 0},
    reviewNegative: {type: Number, default: 0},
    reviewPositive: {type: Number, default: 0},
    date: {type: Date, default: Date.now()},
    description: {type: String, required: true}, 
    tags: [], type: String,
    frecuencia: [frecuenciaSchema],
    comments: [commentSchema]
},{
  timestamps: true,
});

claseSchema.plugin(mongoosePaginate);

const Clase = mongoose.model('Clase', claseSchema);

module.exports = Clase;