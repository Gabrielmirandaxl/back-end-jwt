const {validationResult} = require("express-validator")

const validationErros = (request, response, next) =>{
  const errors = validationResult(request)

  if(errors.isEmpty()){
    return next()
  }

  const extractedErrors = []

  errors.array().map((err) => extractedErrors.push(err.msg))

  return response.status(400).json({
    error: extractedErrors
  })

}

module.exports = validationErros