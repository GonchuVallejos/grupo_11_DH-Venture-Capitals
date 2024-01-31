const path = require('path')

const userControllers = {
    login: ( req, res ) =>{
        const pathHome = path.join(__dirname, '..' , '..' ,'/views/login.html')
        res.sendFile(pathHome);
    },
    register:  ( req, res ) =>{
        const pathHome = path.join(__dirname, '..' , '..' , 'views/register.html')
        res.sendFile(pathHome);}
    
}

module.exports = userControllers;