const fs = require('fs');
const path = require('path');
const userFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));
const bcryptjs = require('bcryptjs')

const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require('sequelize')

const User = {
    fileName: users,

    findeUserToLogin:async function (userEmail, pass) {

        const personaBuscada = await db.Persona.findOne({
            include: ['usuarios'],
            where: {email : userEmail},
        })

        const usuarioBuscado = await db.Usuario.findOne({
            where: {id_persona : personaBuscada.id}
        }) 

        


       console.log("el usuario buscado es" , usuarioBuscado)

        if (usuarioBuscado) {
            console.log('entre a ver el pas')
            let check = bcryptjs.compareSync(pass, usuarioBuscado.password)
            console.log(check)
            if (check) {
                return true;
            } else {
                return false;
            }

        } else {
            return false;
        }

    }

}

module.exports = User