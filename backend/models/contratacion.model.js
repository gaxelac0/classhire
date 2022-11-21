var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");

var contratacionSchema = new mongoose.Schema(
  {
    profile_id: { type: mongoose.Schema.Types.ObjectId, ref: "Profile", required: true },
    clase_id: { type: mongoose.Schema.Types.ObjectId, ref: "Clase", required: true },
    state_in_order: ["solicitada"], // solicitada, cancelada(Motivo), rechazada, aceptada, finalizada
    reasons_in_order: [],
    name: {type: String, required: true},
  },
  {
    timestamps: true,
  }
);

contratacionSchema.plugin(mongoosePaginate);
const Contratacion = mongoose.model("Contratacion", contratacionSchema);

module.exports = Contratacion;
