const fs = require('fs');
const path = require('path');
const crypto = require('crypto'); //Para generar los id
const bcryptjs = require('bcryptjs'); // para encriptar o hashear la conrtaseña
const usersModel = require('../Models/Users')
const session = require('express-session'); // requerimos para poder utilizar sesiones
const User = require('../Models/Users');


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
        let check = usersModel.findeUserToLogin(req.body.password, req.body.password)

        if (check) {
            req.session.email = email;
            req.session.password = password
            console.log(req.session.userLogin)
            res.redirect('/')
        } else {
            res.redirect("/users/login")
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
            image: res.cookie("imageUser", "default-image.png")
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