const path = require('path')

const productsControllers = {
    productDetail: (req, res) => {
        res.render('productDetail')
    }

    /*app.get('/productDetail', ( req, res ) =>{
    const pathHome = path.join(__dirname, 'views/productDetail.html')
    res.sendFile(pathHome);
})
*/
}

module.exports = productsControllers;