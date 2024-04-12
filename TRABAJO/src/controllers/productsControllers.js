const path = require('path')
const fs = require('fs');
let products = require('../data/productsDataBase.json')
const crypto = require('crypto'); //Para generar los id
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');

const db = require('../database/models');
const sequelize = db.sequelize;


const productsControllers = {
    productDetail: async (req, res) => {
        productoId = req.params.id

		productoSeleccionado = await db.Producto.findByPk(productoId)
        //products.find((product) => product.id == productoId)
        
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

        let imageName = req.file ? req.file.filename : "default-image.png";

        const newProduct = {
            id : crypto.randomUUID(),
            name: req.body.nombre,
            image: res.cookie("imageProduct", imageName), //res.cookie("img", imageName)
            price: req.body.precio,
            categorias: req.body.categorias,
            discount: req.body.descuento,
            inOffert: hasOffert,
            descripcion: req.body.descripcion,
            requirement: req.body.requisitos,
            history: req.body.historia
        }
        console.log(imageName);
        
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
    edit: async (req, res) => {

        const productoSeleccionado = await db.Producto.findByPk(req.params.id, {
            include: ['categoria']
        });
        console.log("estoy en edit");
        res.render('productEdit', { productoSeleccionado })

        //falta ver de traer el nombre de la img y la categoria
    },

    update: async (req, res) => {
        let { id } = req.params;
        let hasDiscount = parseInt(req.body.descuento, 10);
        let hasOffert = false;
        if (hasDiscount > 0) { 
            hasOffert = true;
        }
        await db.Producto.update({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            historia : req.body.historia,
            descuento : req.body.descuento,
            imagen: req.params.imagen,
            requisitos: req.body.requisitos,
            oferta: hasOffert,
            precio: req.body.precio,
            id_categoria : req.body.categorias
        },
        {
            where: { id: req.params.id}    
        })
        console.log(req.body)
        res.redirect('/products/productDetail/' + id);
    }
}

module.exports = productsControllers;