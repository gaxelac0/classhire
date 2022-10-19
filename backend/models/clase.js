import mongoose from 'mongoose'

const FrecuenciaEnum = ["unica", "diaria", "semanal", "mensual"];
const frecuenciaSchema = new mongoose.Schema({value: { type: String, enum: FrecuenciaEnum}});

const claseSchema = new mongoose.Schema({
    title: {type: String, required: true},
    price: {type: Number, required: true},
    rating: {type: Number, default: 0}, 
    reviewCount: {type: Number, default: 0},
    date: {type: Date, default: Date.now()},
    description: {type: String, required: true}, 
    tags: [], type: String,
    frecuencia: [frecuenciaSchema]
},{
  timestamps: true,
})

const Clase = mongoose.model('Clase', claseSchema)

export { Clase, FrecuenciaEnum }
