const {body} = require('express-validator');

userValidations = {
    loginValidations : [
        body('email')
        .notEmpty().withMessage('Debes completar el mail'),
        body('password')
        .notEmpty().withMessage('Debes completar la contraseña').bail().isLength({min: 5})
    ],
    


    }

module.exports = userValidations;