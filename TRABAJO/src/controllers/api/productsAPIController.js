// const usersModel = require('../Models/Users')
const db = require('../../database/models');
const { Op } = require("sequelize");

const Products = db.Producto;
const Categories = db.Categoria;

const PORT = require('../../../configPort').PORT;

const productsAPIController = {
    'list': async (req, res) => {
        try {
            // Obtengo todos los productos incluidas las categorias
            const products = await Products.findAll({
                include: ['categoria']
            });

            //Obtengo las categorias con la cantidad de productos que tiene cada una
            const cetegoriesCount = await Categories.findAll({
                attributes: [
                    'id',
                    'descripcion',
                    [db.sequelize.fn('COUNT', db.sequelize.col('productos.id_categoria')), 'cantidad']
                ],
                include: [
                    {
                        model: Products,
                        as: 'productos',
                        attributes: []
                    }
                ],
                group: ['categoria.id']
            });

            //agrego la URL del detalle de cada producto
            const productsWithUrl = products.map(product => {
                return {
                    ...product.dataValues,
                    detailURL: "http://localhost:" + PORT + "/api/products/" + product.id
                }
            });

            let respuesta = {
                meta: {
                    status: 200,
                    totalProducts: products.length,
                    url: '/api/products',
                    countByCategory: cetegoriesCount
                },
                data: productsWithUrl
            };
            res.json(respuesta);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                meta: {
                    status: 500,
                    message: 'Error al obtener los productos'
                },
                error: error.message
            });
        }
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
                        data: {
                            ...product.dataValues,
                            imageURL: "http://localhost:" + PORT + "/img/portada/" + product.imagen
                        }
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