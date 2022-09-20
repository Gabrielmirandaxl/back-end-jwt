const mongoose = require("mongoose")

const schema = mongoose.Schema({
  name: String,
  email: String,
  cpf: String,
  password: String,
  
}, {
  timestamps: true
})

const Model = mongoose.model("users", schema)

module.exports = Model