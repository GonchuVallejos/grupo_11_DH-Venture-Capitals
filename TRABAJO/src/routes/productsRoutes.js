const express = require('express');
const path = require('path')

const router = express.Router();

const multer = require('multer') // requiero multer para poder subir archivos

const productControllers = require('../controllers/productsControllers');

// configuro multer

var storage = multer.diskStorage({
    destination: function (req, file,cb){
        cb(null,path.join(__dirname,'..','..','public','img','portada'))
    },
    
    filename: function(req, file, cb){
        pathFileName = 'img-' + Date.now() + path.extname(file.originalname) 
        cb(null, pathFileName);
    }
})

var upload = multer({storage})



router.get('/productList', productControllers.list);

router.get('/productDetail/:id', productControllers.detail);
//Rutas exigidas para la creación del CRUD

router.delete('/productDetail/:id', productControllers.destroy);

router.get('/productEdit/:id', productControllers.edit);
router.put('/productEdit/:id',upload.single('imagen'), productControllers.update);

router.get('/productAdd', productControllers.productAdd);
router.post('/productAdd', upload.single('imagen'), productControllers.create);

router.get('/productCart', productControllers.productCart);


module.exports = router;