const express = require('express');

const router = express.Router();

const userControllers = require('../controllers/userControllers');

const sesionFactory = require('../middlewares/sesionFactory')

router.get('/login',sesionFactory.userLogin, userControllers.login);

router.post('/login', userControllers.enterLogin);

router.get('/register', userControllers.register);

router.get('/productCart', userControllers.productCart);

router.post('/register', userControllers.store);

router.get('/updateUser', userControllers.update);

module.exports = router;
