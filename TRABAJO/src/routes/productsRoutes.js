const express = require('express');

const router = express.Router();

const productControllers = require('../controllers/productsControllers');

router.get('/productDetail', productControllers.productDetail)

module.exports = router;