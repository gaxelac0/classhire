var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

var RoleEnum = require("../utils/constants").RoleEnum;

// TODO: validar type(nivel) en controller / servicio
var experienciaSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    descr: { type: String, required: true },
    completed: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

var profileSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    fecNacimiento: { type: Date, required: false },
    titulo: { type: String, required: false },
    experiencias: [experienciaSchema],
    photo: { type: String, required: false } /* base 64 */,
    clases: [{ type: mongoose.Schema.Types.ObjectId, ref: "Clase" }],
    role: { type: String, enum: RoleEnum },
  },
  {
    timestamps: true,
  }
);

profileSchema.plugin(mongoosePaginate);
profileSchema.plugin(aggregatePaginate);
var Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
