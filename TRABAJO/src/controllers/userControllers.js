const fs = require('fs');
const path = require('path');
const crypto = require('crypto'); //Para generar los id

const userFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));

const userControllers = {
    login: (req, res) => {
        res.render('login')
    },
    register: (req, res) => {
        res.render('register')
    },
    store:(req, res) => {
        const newUser = {
            id : crypto.randomUUID(),
            nombre : req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            password: req.body.password,
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