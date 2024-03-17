const fs = require('fs');
const path = require('path');
const crypto = require('crypto'); //Para generar los id
const bcryptjs = require('bcryptjs'); // para encriptar o hashear la conrtaseña
const usersModel = require('../Models/Users')
const session = require('express-session') // requerimos para poder utilizar sesiones


const userFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));

const userControllers = {
    login: (req, res) => {
        const idFound = +req.params.id
        const User = users.find(U => U.id === idFound)
        res.render('login',{User})
    },
    enterLogin: (req, res) => {
        const {password, email} = req.body
        let check = usersModel.findeUserToLogin(req.body.password, req.body.email)

        users.forEach(U => {if (check) {
            U.password = password;
            U.email = email
            console.log(req.session.userLogin)
        }})
        /*else{ res.redirect('/users/login') } esta parte hace que el button te envie al mismo lugar sin importar el resultado,
         esto se puede solucionar luego agregando las promesas*/
        res.redirect('/')

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
            password: bcryptjs.hashSync(req.body.password, 10)
            //image: "default-image.png"
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