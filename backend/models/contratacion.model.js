var mongoose = require("mongoose");

var contratacionSchema = new mongoose.Schema(
  {
    profile_id: { type: mongoose.Schema.Types.ObjectId, ref: "Profile", required: true },
    clase_id: { type: mongoose.Schema.Types.ObjectId, ref: "Clase", required: true },
    state: { type: String, required: true, default: "solicitada" }, // solicitada, cancelada(Motivo), rechazada, aceptada, finalizada
    reason: {type: String, required: false}
  },
  {
    timestamps: true,
  }
);

const Contratacion = mongoose.model("Contratacion", contratacionSchema);

module.exports = Contratacion;
