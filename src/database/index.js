const mongoose = require('mongoose')


function connect(){

mongoose.connect("mongodb://localhost:27017/register")

const db = mongoose.connection

db.once("open", () => {
  console.log("database connected")
})

db.on("error", () => {
  console.error.bind(console, "connection failed database")
})

}

module.exports = {
  connect
}