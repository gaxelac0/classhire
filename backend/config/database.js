var mongoose = require('mongoose');

const db = mongoose.connection;

mongoose.connect(process.env.DATABASE_URL, {
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASSWORD,
  useNewUrlParser: true,
  useUnifiedTopology: true 
})

console.log("DATABASE_URL", process.env.DATABASE_URL)
console.log("MONGO_USER", process.env.MONGO_USER)
console.log("MONGO_PASSWORD", process.env.MONGO_PASSWORD)


db.on('connected', function () {
  console.log(`Connected to MongoDB ${db.name} at ${db.host}:${db.port}`)
})
