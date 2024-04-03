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
    },
/*    enterLogin: async(req, res) => {
        try{
            const userIds = await db.User.findByPk(req.params.id)
            res.render('login',{userIds})
        }catch{
            return res.send("<h2>A acurrido un error en la busqueda del id</h2>")
        }
    },*/
    delete: async (req, res) => {
        try{
            const userIds = await db.User.findByPk(req.params.id)
            res.render('destroy',{userIds})
        }catch{
            return res.send("<h2>A acurrido un error en la busqueda del id</h2>")
        }
    },
    destroySession:  async function(req, res){
        //req.session.destroy();
        try{
            await db.User.destroy({where:{id: req.params.id}})
            return res.redirect("/")
        }catch{
            return res.send("<h2>A acurrido un error en el algoritmo</h2>")
        }
    },
    register: async (req, res) => {
        try{
            const userIds = await db.User.findAll()
            res.render('register',{userIds})
        }catch{
            return res.send("<h2>A acurrido un error en la busqueda del id</h2>")
        }
    },
    store: async (req, res) => {
        try{
            await db.User.create(...req.body)
            return res.redirect("/")
        }catch{
            return res.send("<h2>A acurrido un error en la busqueda del id</h2>")
        }
    },
    edit: async (req, res) => {
        try{
            const userIds = await db.User.findByPk(req.params.id)
            res.render('updateUser',{userIds})
        }catch{
            return res.send("<h2>A acurrido un error en la busqueda del id</h2>")
        }
    },
    update:async (req, res) => {
        try{
            await db.User.update(...req.body,{where:{id: req.params.id}})
            return res.redirect("/")
        }catch{
            return res.send("<h2>A acurrido un error en la busqueda del id</h2>")
        }
    },
    productCart: (req, res) => {
        res.render('productCart')
    },
}

module.exports = userControllers;