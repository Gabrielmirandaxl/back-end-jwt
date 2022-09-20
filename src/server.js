const express = require("express")
const app = express()

const db = require("./database/")
const router = require("./router")

db.connect()


// post method enabling
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//routes
app.use("/", router)

const port = process.env.port || 8080
app.listen(port, () =>{
  console.log(`server running on port ${port}`)
})
