// const usersModel = require('../Models/Users')
const db = require('../../database/models');

const Users = db.Usuario;

const usersAPIController = {
    'list': (req, res) => {
        Users.findAll({
            attributes: ['id', 'nombre_usuario', 'avatar', 'id_persona', 'id_rol'],
            include: ['persona']
        })
            .then(users => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: users.length,
                        url: '/api/users'
                    },
                    data: users
                }

                res.json(respuesta)
            })
            .catch(error => {
                res.status(500).json({
                    meta: {
                        status: 500,
                        message: 'Error al obtener los usuarios'
                    },
                    error: error.message
                });
            });
    },
    'detail': (req, res) => {
        Users.findByPk(req.params.id, {
            attributes: ['id', 'nombre_usuario', 'avatar', 'id_persona', 'id_rol'],
            include: ['persona']
        })
            .then(user => {
                if (user) {
                    let respuesta = {
                        meta: {
                            status: 200,
                            url: '/api/users/' + user.id
                        },
                        data: user
                    }
                    res.json(respuesta)
                } else {
                    res.status(404).json({
                        meta: {
                            status: 404,
                            message: 'Usuario no encontrado'
                        }
                    });
                }
            })
            .catch(error => {
                res.status(500).json({
                    meta: {
                        status: 500,
                        message: 'Error al obtener el usuario'
                    },
                    error: error.message
                });
            });
    }


}

module.exports = usersAPIController;