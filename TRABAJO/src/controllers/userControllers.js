const fs = require('fs');
const path = require('path');
const crypto = require('crypto'); //Para generar los id
const bcryptjs = require('bcryptjs'); // para encriptar o hashear la conrtaseña
const usersModel = require('../Models/Users')
const session = require('express-session'); // requerimos para poder utilizar sesiones
const { validationResult } = require('express-validator');

const db = require('../database/models');
const { response } = require('express');
const sequelize = db.sequelize;

const userFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));

const userControllers = {
    login: async (req, res) => {
        try{
            const userIds = await db.User.findByPk(req.params.id)
            res.render('login',{userIds})
        }catch{
            return res.send("<h2>A acurrido un error en la busqueda del id</h2>")
        }
        /*const idFound = +req.params.id
        const User = users.find(U => U.id === idFound)
        loggedUser = false;
        if(req.session.userLogin){
            loggedUser = true;
        }
        res.render('login',{User, loggedUser})
        let errors = validationResult(req);*/
    },
    enterLogin: async(req, res) => {
        try{
            const userIds = await db.User.findAll()
            await db.User.create(...req.body)
                .then(user => {return res.status(200).json({
                    /*aca se añadiran los datos*/
                })})
                .catch(error => {})
        }catch{
            return res.send("<h2>A acurrido un error en la busqueda del id</h2>")
        }
        /*userMail = req.body.email;
        userPass = req.body.password;

        let check = usersModel.findeUserToLogin(userMail, userPass)

        if (check) {
            req.session.userLogin = userMail;
            console.log(req.session.userLogin)
            res.redirect('/')
        } else {
            let mensajeError = 'Usuario y/o contraseña invalidos'
            res.render('login', {mensajeError:mensajeError});
        }*/

    },

    destroySession: function(req, res){
        req.session.destroy();
        res.redirect('/')
    },

    register: (req, res) => {
        res.render('register')
    },
    store: (req, res) => {
        
        existeUsuario = false;
        
        users.forEach(function(user){
            if(user.email == req.body.email){
                existeUsuario = true;
            }
        })
        userImg = 'default.jpg'

        if(req.file && req.file.filename){
            userImg = req.file.filename

        }
        
        const newUser = {
            id: crypto.randomUUID(),
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password, 10),
            image: userImg
        }

        users.push(newUser);

        //Sobreescribo el archivo json original
        fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2))

        res.render('login');
    },
    productCart: (req, res) => {
        res.render('productCart')
    },
    update: (req, res) => {
        User.forEach(user => {
            
            if (user.id == id) {
                if(req.cookies.file){
                    res.cookie("imageUser", user.image = req.file.filename)
                }
                user.nombre = req.body.nombre;
                user.apellido = req.body.apellido;
                user.email = email;
                producto.password = req.body.password;
            }
        });
        res.render('updateUser')
    }
}

module.exports = userControllers;