const express = require('express');

const router = express.Router();

const productControllers = require('../controllers/productsControllers');

/* 1. /products (GET) ESTA
Listado de productos
2. /products/create (GET)
Formulario de creación de productos
3. /products/:id (GET)
Detalle de un producto particular
4. /products (POST)
Acción de creación (a donde se envía el formulario)
5. /products/:id/edit (GET)
Formulario de edición de productos
6. /products/:id (PUT)
Acción de edición (a donde se envía el formulario):
7. /products/:id (DELETE)
Acción de borrado */





router.get('/productDetail/:id', productControllers.productDetail);

router.delete('/productDetail/:id', productControllers.delete);

router.get('/productEdit/:id', productControllers.edit);

router.put('/productEdit/:id', productControllers.update);

router.get('/productAdd', productControllers.productAdd);

router.post('/productAdd', productControllers.store);




module.exports = router;