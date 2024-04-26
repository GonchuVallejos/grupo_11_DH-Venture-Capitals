const fs = require('fs');
const path = require('path');
const crypto = require('crypto'); //Para generar los id
const bcryptjs = require('bcryptjs'); // para encriptar o hashear la conrtaseña
const usersModel = require('../Models/Users')
const session = require('express-session'); // requerimos para poder utilizar sesiones
const { validationResult } = require('express-validator');


const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require('sequelize')

//quitar luego de agregar la relacion con la BD
const userFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));

const userControllers = {
    login: async (req, res) => {

        console.log(idFound)

        loggedUser = false;
        if (req.session.userLogin) {
            loggedUser = true;
            console.log('existe usuario logado y el mail es', req.session.userLogin)
        }
        res.render('login', { loggedUser })

        let errors = validationResult(req);//esto no se para que sirve.-
    },
    enterLogin: async (req, res) => {
        userMail = req.body.email;
        userPass = req.body.password;

        let check = await usersModel.findeUserToLogin(userMail, userPass)

        console.log('estoy en el controlador y el resultado es ')

        if (check) {
            req.session.userLogin = userMail;
            console.log('el mail logado es', req.session.userLogin)
            res.redirect('/')
        } else {
            let mensajeError = 'Usuario y/o contraseña invalidos'
            res.render('login', { mensajeError: mensajeError });
        }
    },

    destroySession: function (req, res) {
        req.session.destroy();
        res.redirect('/')
    },

    register: (req, res) => {
        res.render('register')
    },
    store: async (req, res) => {

        existeUsuario = false;
        userImg = 'default.jpg'
        personEmail = req.body.email

        const busquedaPersona = await db.Persona.findAll({
            where: { email: personEmail }
        })

        if (busquedaPersona.length > 0) {
            existeUsuario = true;
        }

        if (!existeUsuario) {

            if (req.file && req.file.filename) {
                userImg = req.file.filename
            }
            //si el usuario no existe se crea la persona
            const nuevaPersona = await db.Persona.create(
                {
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    email: personEmail,
                    tipo_doc: req.body.tipodoc,
                    dni: req.body.documento,
                    domicilio: req.body.domicilio,
                    fecha_nac: req.body.fecha_nac,
                    sexo: req.body.sexo,
                    telefono: req.body.telefono,
                    estado: true
                });
            //creo el ususario luego de obtener el id de la persona que se creo anteriormente
            await db.Usuario.create(
                {
                    password: bcryptjs.hashSync(req.body.password, 10),
                    avatar: userImg,
                    id_persona: nuevaPersona.id,
                    id_rol: 1,
                    nombre_usuario: req.body.nombre_usuario
                }
            )

        } else {
            res.send("ya existe el ususario") // al validar enviar a la vista este error
        }

        //users.push(newUser);

        //Sobreescribo el archivo json original
        //fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2))

        res.render('login');
    },
    productCart: (req, res) => {
        res.render('productCart')
    },
    update: async (req, res) => {
        const userId = req.params.id;

        const user = []

        const usuarioEncontrado = await db.Usuario.findOne(
            {
                where: {id : userId}
            })
        

            if (usuarioEncontrado) {
               /* if (req.cookies.file) {
                    res.cookie("imageUser", user.image = req.file.filename)
                }*/
                user.nombre = usuarioEncontrado.nombre;
                user.apellido = usuarioEncontrado.apellido;
                user.email = usuarioEncontrado.email;
                //producto.password = req.body.password;
            }
        
        res.render('updateUser', {user})
    }
}

module.exports = userControllers;