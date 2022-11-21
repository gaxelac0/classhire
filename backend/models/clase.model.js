var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");
var moment = require("moment");
const Contratacion = require("./contratacion.model");

const MateriaEnum = [
  "ruby",
  "java",
  "golang",
  "cplusplus",
  "python",
  "javascript",
];
var materiaSchema = new mongoose.Schema({
  value: { type: String, enum: MateriaEnum },
});

const FrecuenciaEnum = ["once", "diaria", "semanal", "mensual"];
var frecuenciaSchema = new mongoose.Schema({
  value: { type: String, enum: FrecuenciaEnum },
});

const NivelEnum = [
  "primaria",
  "secundaria",
  "terciario",
  "universitario",
  "seminario",
];
var nivelSchema = new mongoose.Schema({
  value: { type: String, enum: NivelEnum },
});

const TipoClaseEnum = ["individual", "grupal", "consulta"];
var tipoClaseSchema = new mongoose.Schema({
  value: { type: String, enum: TipoClaseEnum },
});

var commentSchema = new mongoose.Schema(
  {
    state: {type: String, required: true, default: "enviado"},
    state_reason: {type: String, required: true, default: "usuario envio review"},
    type: {
      type: String,
      required: true,
    } /* can be positive, negative, neutral */,
    comment: { type: String, required: true },
    profile_author_id: { type: mongoose.Schema.Types.ObjectId, ref: "Profile" },
  },
  {
    timestamps: true,
  }
);

var claseSchema = new mongoose.Schema(
  {
    state: {type: String, required: true, default: "publicada"},
    title: { type: String, required: true },
    materia: materiaSchema,
    description: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
    nivel: nivelSchema,
    frecuencia: frecuenciaSchema,
    tipo_clase: tipoClaseSchema,
    tags: [], type: String,
    teacher_profile_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },
    comments: [commentSchema],
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    reviewNegative: { type: Number, default: 0 },
    reviewPositive: { type: Number, default: 0 },

    // contrataciones: [Contratacion],

    date: { type: String, default: moment().format("DD/MM/YYYY") },
  },
  {
    timestamps: true,
  }
);

claseSchema.plugin(mongoosePaginate);

const Clase = mongoose.model("Clase", claseSchema);

module.exports = Clase;
