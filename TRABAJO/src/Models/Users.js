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

    },
    findeUserWithMail: async function (userEmail) {

        const personaBuscada = await db.Persona.findOne({
            include: ['usuarios'],
            where: { email: userEmail },
        })
        
        if (personaBuscada) {
            console.log('entre a ver el pas')

            const [usuarioBuscado] = personaBuscada.usuarios

            return usuarioBuscado
        } 
    },
    verifyLoggedUser:(req, res) => {
        loggedUser = false;
        loggedUserAdmin= false;
        loggedName = '';
        if (req.session.userLogin || req.cookies.user) {
            loggedUser = true;
            if(req.session.userLogin){
                loggedName = req.session.userName;
            } else{
                loggedName = req.cookies.userName;
            }
            
            
            if(req.cookies.userRolId == 1 || req.session.userRol == 1){
                loggedUserAdmin = true;

            }
            console.log('existe usuario logeado y el mail es', req.session.userLogin)
        }
    }

}

module.exports = User