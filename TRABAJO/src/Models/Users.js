const fs = require('fs');
const path = require('path');
const userFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(userFilePath, 'utf-8'));
const bcryptjs = require('bcryptjs')

const User = {
    fileName: users,

    findeUserToLogin: function (email, pass) {

        usuarioBuscado = users.find((user) => user.email == email)
       
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