import jwt_decode from 'jwt-decode'

function setToken(token) {
  localStorage.setItem('token', token)
}

function getToken() {
  let token = localStorage.getItem('token')
  if (token) {
    const payload = jwt_decode(token)
    if (payload.exp < Date.now() / 1000) {
      localStorage.removeItem('token')
      token = null
    }
  } else {
    localStorage.removeItem('token')
  }
  return token
}

  // DEMOFRONTEND
  // name: {type: String, required: true},
  // email: { type: String, required: true, lowercase: true, unique: true },
  // password: {type: String, required: true},
  // profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
  // roles: [], type: Stringroles
function getUserFromToken() {

 /*  let user = {
    name:"Pepe Pistolero",
    email:"pepe@outlook.com",
    role: "student",
  };

  return user; */
  
  const token = getToken()
  return token ? jwt_decode(token).user : null
}

function removeToken() {
  localStorage.removeItem('token')
}

export { setToken, getToken, getUserFromToken, removeToken }
