const express = require('express');

const router = express.Router();

const productControllers = require('../controllers/productsControllers');

router.get('/productDetail', productControllers.productDetail)

router.get('/productAdd', productControllers.productAdd)

module.exports = router;