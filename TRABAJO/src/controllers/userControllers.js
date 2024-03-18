const fs = require('fs');
const path = require('path');
const crypto = require('crypto'); //Para generar los id
const bcryptjs = require('bcryptjs'); // para encriptar o hashear la conrtaseña
const usersModel = require('../Models/Users')
const session = require('express-session'); // requerimos para poder utilizar sesiones
const { validationResult } = require('express-validator');


const userFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));

const userControllers = {
    login: (req, res) => {
        const idFound = +req.params.id
        const User = users.find(U => U.id === idFound)
        res.render('login',{User})
        let errors = validationResult(req);
    },
    enterLogin: (req, res) => {
        userMail = req.body.email;
        userPass = req.body.password;

        let check = usersModel.findeUserToLogin(userMail, userPass)

        if (check) {
            req.session.userLogin = userMail;
            console.log(req.session.userLogin)
            res.redirect('/')
        } else {
            let mensajeError = 'Usuario y/o contraseña invalidos'
            res.render('login', {mensajeError:mensajeError});
        }

    },
    register: (req, res) => {
        res.render('register')
    },
    store: (req, res) => {
        const newUser = {
            id: crypto.randomUUID(),
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password, 10),
            image: req.file.filename || 'default.jpg'
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
        res.render('updateUser')
    }
}

module.exports = userControllers;