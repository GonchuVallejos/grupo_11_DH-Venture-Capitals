const path = require('path')
const fs = require('fs');
let products = require('../data/productsDataBase.json')
const crypto = require('crypto'); //Para generar los id
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');


const productsControllers = {
    productDetail: (req, res) => {
        productoId = req.params.id

		productoSeleccionado = products.find((product) => product.id == productoId)
        
        res.render('productDetail', { productoSeleccionado })
    },
    productAdd: (req, res) => {
        res.render('productAdd')
    },

    store:(req, res) => {
        let hasDiscount = parseInt(req.body.descuento, 10);
        let hasOffert = false;
        if (hasDiscount > 0){ 
            hasOffert = true;
        }

        const newProduct = {
            id : crypto.randomUUID(),
            name: req.body.nombre,
            image: "default-image.png",
            price: req.body.precio,
            categorias: req.body.categorias,
            discount: req.body.descuento,
            inOffert: hasOffert,
            descripcion: req.body.descripcion,
            requirement: req.body.requisitos,
            history: req.body.historia
        }
        console.log(newProduct);
        console.log(hasDiscount);
        products.push(newProduct);

        //Sobreescribo el archivo json original
        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2))
        let idProducto= newProduct.id
        res.redirect('/products/productDetail/' + idProducto);
    },
    delete:(req, res) =>{
        let id = req.params.id
        let productsDelete = products.filter(product => product.id != id);
        fs.writeFileSync(productsFilePath, JSON.stringify(productsDelete, null, 2))
        res.redirect('/');
        console.log("borre el id" + id);

    },
    edit:(req, res) => {
        productoId = req.params.id

		productoSeleccionado = products.find((product) => product.id == productoId)
        console.log("estoy en edit");
        res.render('productEdit', { productoSeleccionado })
    },

    update: (req, res)=>{
        let {id} = req.params;
       // let {name, image, price, categorias, discount, inOffert, descripcion, requirement, history} = req.body;
        let hasDiscount = parseInt(req.body.descuento, 10);
        let hasOffert = false;
        if (hasDiscount > 0){ 
            hasOffert = true;
        }

        products.forEach(producto => {

            if(producto.id == id){
                producto.name = req.body.nombre,
                producto.image = "default-image.png",
                producto.price = req.body.precio,
                producto.categorias = req.body.categorias,
                producto.discount = req.body.descuento,
                producto.inOffert = hasOffert,
                producto.descripcion = req.body.descripcion,
                producto.requirement =  req.body.requisitos,
                producto.history = req.body.historia
            }
            fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2))
            res.redirect('/products/productDetail/' + id);
        })

    }

    



    /*app.get('/productDetail', ( req, res ) =>{
    const pathHome = path.join(__dirname, 'views/productDetail.html')
    res.sendFile(pathHome);
})
*/
}

module.exports = productsControllers;