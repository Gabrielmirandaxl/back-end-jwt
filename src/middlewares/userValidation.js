const {body} = require("express-validator")

const createValidation = () => {

  return[
    body("name")
    .isString()
    .withMessage("O nome do usuário é obrigatório!")
    .isLength({max: 15})
    .withMessage("O nome só pode conter 15 caracteres"),

    body("email")
    .isString()
    .withMessage("O campo email é obrigatório")
    .isEmail()
    .withMessage("O email é deve ser válido"),

    body("cpf")
    .isString()
    .withMessage("O campo cpf é obrigatório")
    .isLength({max: 14})
    .withMessage("Digite de novo o seu cpf"),

    body("password")
    .isString()
    .withMessage("O campo password é obrigatório")
    .isLength({min: 8})
    .withMessage("Sua senha deve ter no minímo 8 caracteres"),

    body("confirmPassword")
    .isString()
    .withMessage("Confirme sua senha")
    .custom((value, {req}) => {
       if(value !== req.body.password){
        throw new Error("As senhas não são iguais!")
       }

       return true
    })
    
    
  ]

}

const loginValidation = () =>{
  return [
    body("email")
    .isString()
    .withMessage("O campo email é obrigatório")
    .isEmail()
    .withMessage("O email é deve ser válido"),

    body("password")
    .isString()
    .withMessage("O campo password é obrigatório")
    .isLength({min: 8})
    .withMessage("Sua senha deve ter no minímo 8 caracteres"),
  ]
}


const updateValidation = () =>{
  return[
    
    body("name")
    .isString()
    .withMessage("O nome do usuário é obrigatório!")
    .isLength({max: 15})
    .withMessage("O nome só pode conter 15 caracteres"),

    body("email")
    .isString()
    .withMessage("O campo email é obrigatório")
    .isEmail()
    .withMessage("O email é deve ser válido"),

    body("cpf")
    .isString()
    .withMessage("O campo cpf é obrigatório")
    .isLength({max: 14})
    .withMessage("Digite de novo o seu cpf"),

    body("password")
    .isString()
    .withMessage("O campo password é obrigatório")
    .isLength({min: 8})
    .withMessage("Sua senha deve ter no minímo 8 caracteres"),

    body("confirmPassword")
    .isString()
    .withMessage("Confirme sua senha")
    .custom((value, {req}) => {
       if(value !== req.body.password){
        throw new Error("As senhas não são iguais!")
       }

       return true
    })
  ]
}

module.exports = {
  createValidation,
  loginValidation,
  updateValidation,
}

