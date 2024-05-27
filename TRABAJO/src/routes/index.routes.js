const express = require('express');

const routes = express.Router();

routes.use('/', require('./mainRoutes'))

routes.use('/products', require('./productsRoutes'))

routes.use('/users', require('./userRoutes'))

routes.use('/api', require('./api/apiRoutes'))

module.exports = routes;
