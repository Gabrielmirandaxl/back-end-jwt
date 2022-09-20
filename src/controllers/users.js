const UserModel = require("../models/Users")

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("../config/index.json")



const generateToken = (id) =>{
   return jwt.sign({id}, config.secret, {
    expiresIn: 84600,
   } )
}

async function createUser(request, response){

  try {
    
    const {name, email, cpf, password} = request.body

    const existeEmail = await UserModel.findOne({email: email})

    if(existeEmail){
      return response.status(200).json({
        email: "Esse email já está em uso"
      })
    }

    const salt = await bcrypt.genSalt()
    const hashPassword = await bcrypt.hash(password, salt)
    const hashCpf = await bcrypt.hash(cpf, salt)
   

    const createUser = await UserModel.create({
      name,
      email,
      cpf: hashCpf,
      password: hashPassword,
    })

    if(!createUser){
      return response.status(500).json({error: "Não foi possível cadastrar o usuário"})
    }

    return response.status(200).json({
      user: createUser,
      token: generateToken(createUser.id),
    })

  } catch (error) {
    console.error(error)
  }
}

async function loginUser(request, response){
  
  try {

    const {email, password} = request.body
    
    
    const userLogin = await UserModel.findOne({email: email})
    
    if(!userLogin || !(await bcrypt.compare(password, userLogin.password))){
      return response.status(404).json({ error: "Email ou password not found"})
    }

    return response.status(200).json({
      token: generateToken(userLogin.id)
    })


  } catch (error) {
    console.error(error)
  }

}

async function updateUser(request, response){
   
const {name, cpf, password} = request.body


const salt = await bcrypt.genSalt()
const hashPassword = await bcrypt.hash(password, salt)
const hashCpf = await bcrypt.hash(cpf, salt)

  const user = request.user
  const updateUser = await UserModel.findById(user.id)

  updateUser.name = name
  updateUser.cpf = hashCpf
  updateUser.password = hashPassword

  updateUser.save()

  if(!updateUser){
    return response.status(500).json({error: "unable to update user"})
  }

  return response.status(200).json({update: "user profile update sucess"})
}

module.exports = {
  createUser,
  loginUser,
  updateUser,
}