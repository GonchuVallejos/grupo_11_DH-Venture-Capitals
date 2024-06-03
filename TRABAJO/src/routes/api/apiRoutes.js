const express = require('express');

const router = express.Router();

const usersAPIController = require('../../controllers/api/usersAPIController');

const productsAPIController = require('../../controllers/api/productsAPIController');

router.get('/users', usersAPIController.list);
router.get('/users/:id', usersAPIController.detail);

router.get('/products', productsAPIController.list);
router.get('/products/:id', productsAPIController.detail);



module.exports = router;