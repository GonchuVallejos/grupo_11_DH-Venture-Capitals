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

    findeUserToLogin: async function (userEmail, pass) {

        const personaBuscada = await db.Persona.findOne({
            include: ['usuarios'],
            where: { email: userEmail },
        })
        
        if (personaBuscada) {
            console.log('entre a ver el pas')

            const [usuarioBuscado] = personaBuscada.usuarios

            let check = bcryptjs.compareSync(pass, usuarioBuscado.password)

            return check
        } else {
            return false;
        }

    }

}

module.exports = User