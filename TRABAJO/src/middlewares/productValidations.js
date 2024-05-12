const { body } = require('express-validator');
const path = require('path');

const productValidations= [
    body('nombre').trim().notEmpty().withMessage('Debe escribir un nombre para el producto')
    .isLength({ min: 5 }).withMessage('El nombre del producto debe tener al menos 5 caracteres'),
    body('descripcion').trim().notEmpty().withMessage('Debe escribir una descripcion')
    .isLength({ min: 20 }).withMessage('La descripción debe tener al menos 20 caracteres'),
    body('imagen').custom((value, {req})=>{
        let file = req.file;
        if(file){
            let fileExtension = path.extname(file.originalname)
            let acceptedExtensions = ['.jpg', 'jpeg', '.png', '.gif']
            if (!acceptedExtensions.includes(fileExtension)){
                throw new Error(`Las extensiones permitidas para imagenes son ${acceptedExtensions.join(', ')}`)
            }
        }
    })
]

module.exports = productValidations;