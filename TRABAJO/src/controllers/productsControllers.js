const path = require('path')

let products = require('../data/productsDataBase.json')

const productsControllers = {
    productDetail: (req, res) => {
        productoId = req.params.id

		productoSeleccionado = products.find((product) => product.id == productoId)
        
        res.render('productDetail', { productoSeleccionado })
    },
    productAdd: (req, res) => {
        res.render('productAdd')
    }

    /*app.get('/productDetail', ( req, res ) =>{
    const pathHome = path.join(__dirname, 'views/productDetail.html')
    res.sendFile(pathHome);
})
*/
}

module.exports = productsControllers;