const { Router } = require("express")
const ControlerUser = require("../controllers/users")

const router = require("express").Router()


//middlewares
const validationErros = require("../middlewares/validationErrors")
const userValidation = require("../middlewares/userValidation")
const autheValidation = require("../middlewares/autheValidation")

//create user
router.post("/register", userValidation.createValidation() ,validationErros, ControlerUser.createUser)

//login users
router.post("/login", userValidation.loginValidation(), validationErros, ControlerUser.loginUser)


router.post("/profile", autheValidation, userValidation.updateValidation(), validationErros, ControlerUser.updateUser)


module.exports = router