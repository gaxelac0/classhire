import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema({
  name: String,
  photo: { type: String } /* base 64 */, 
  clases: [{type: mongoose.Schema.Types.ObjectId, ref: 'Clase'}],
},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
