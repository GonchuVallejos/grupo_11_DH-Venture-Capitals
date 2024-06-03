// const usersModel = require('../Models/Users')
const db = require('../../database/models');
const { Op } = require("sequelize");

const Products = db.Producto;
const Categories = db.Categoria;

const productsAPIController = {
    'list': (req, res) => {
        Products.findAll({
            include: ['categoria']
        })
            .then(products => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: products.length,
                        url: '/api/products'
                    },
                    data: products
                }

                res.json(respuesta)
            })
            .catch(error => {
                res.status(500).json({
                    meta: {
                        status: 500,
                        message: 'Error al obtener los Productos'
                    },
                    error: error.message
                });
            });
    },
    'detail': (req, res) => {
        Products.findByPk(req.params.id, {
            include: ['categoria']
        })
            .then(product => {
                if (product) {
                    let respuesta = {
                        meta: {
                            status: 200,
                            url: '/api/products/' + product.id
                        },
                        data: product
                    }
                    res.json(respuesta)
                } else {
                    res.status(404).json({
                        meta: {
                            status: 404,
                            message: 'Producto no encontrado'
                        }
                    });
                }
            })
            .catch(error => {
                res.status(500).json({
                    meta: {
                        status: 500,
                        message: 'Error al obtener el Producto'
                    },
                    error: error.message
                });
            });
    }
}

module.exports = productsAPIController;