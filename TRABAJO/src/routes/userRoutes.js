const express = require('express');
const multer = require('multer');
const path = require('path');
const userValidations = require('../middlewares/userValidations.js')

let storage = multer.diskStorage({
    destination : function( req, file, cb){
        cb(null, path.join(__dirname, '../../public/img/userAvatar'))
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + req.body.email+ '-' + Date.now() + path.extname(file.originalname))
    }
})

let upload = multer({storage: storage});


const router = express.Router();

const userControllers = require('../controllers/userControllers');

const sesionFactory = require('../middlewares/sesionFactory');
const { validationResult } = require('express-validator');

router.get('/login', userControllers.login);
//router.post('/login', userControllers.enterLogin);

router.get('/register', userControllers.register );
router.post('/register',  upload.single('userAvatar'), userControllers.create);

router.get('/updateUser/:id', userControllers.edit);
router.get('/updateUser/:id', upload.single('userAvatar'), userControllers.update);

module.exports = router;
