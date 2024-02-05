const path = require('path')

const userControllers = {
    login: (req, res) => {
        /*const pathHome = path.join(__dirname, '..' , '..' ,'/views/login.html')
        res.sendFile(pathHome);*/
        res.render('login')
    },
    register: (req, res) => {
        /*const pathHome = path.join(__dirname, '..' , '..' , 'views/register.html')
        res.sendFile(pathHome);*/
        res.render('register')
    },
    productCart: (req, res) => {
        res.render('productCart')
    } 
    /*app.get('/productCart', ( req, res ) =>{
        const pathCart = path.join(__dirname, 'views/productCart.html')
        res.sendFile(pathCart);
    })*/

}

module.exports = userControllers;