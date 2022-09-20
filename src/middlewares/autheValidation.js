const UserModel = require("../models/Users")
const jwt = require("jsonwebtoken")
const config = require("../config/index.json")

const autheValidation = async (request, response, next) =>{
  
  const headers = request.headers.authorization
  const token = headers && headers.split(" ")[1]

 if(!headers){
  return response.status(401).json({error: "no token provided"})
 }

  if(!token){
    return response.status(401).json({error: " not found token"})
  }

  try {
    
    const verifed = jwt.verify(token, config.secret)

    request.user = await UserModel.findById(verifed.id).select("-password").select("-email").select("-cpf")

    next()

  } catch (error) {
      return response.status(401).json({error: "token invalid"})
  }

}

module.exports = autheValidation