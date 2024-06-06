const path = require('path')
const fs = require('fs');
let products = require('../data/productsDataBase.json')
const crypto = require('crypto'); //Para generar los id
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json'); //comentar luego de integrar con BD
const { validationResult } = require('express-validator');

const db = require('../database/models');
const sequelize = db.sequelize;


const productsControllers = {
    productDetail: async (req, res) => {
        
        loggedUser = false;
        if (req.session.userLogin || req.cookies.user) {
            loggedUser = true;
            console.log('existe usuario logeado y el mail es', req.session.userLogin)
        }
        
        productoId = req.params.id

		productoSeleccionado = await db.Producto.findByPk(productoId)
        
        
        res.render('productDetail', { productoSeleccionado, loggedUser })
    },
    productAdd: async (req, res) => {
        try {
            
            const categoriasProductos = await db.Categoria.findAll();
            console.log(categoriasProductos)
            res.render('productAdd', {categoriasProductos})

        } 
        catch(error){
            console.error('error al obtener datos de la base de datos', error);
            res.status(500).send('error al obtener datos de la base de datos');
        }     
        

    },

    store: async (req, res) => {
        let hasDiscount = parseInt(req.body.descuento, 10);
        let hasOffert = false;
        if (hasDiscount > 0){ 
            hasOffert = true;
        }
        let productoId = "";
        let imageName = req.file ? req.file.filename : "default-image.png";
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0){
            try {
                
                const categoriasProductos = await db.Categoria.findAll();
                console.log(resultValidation)
                res.render('productAdd', {categoriasProductos, errors :resultValidation.mapped()})
    
            } 
            catch(error){
                console.error('error al obtener datos de la base de datos', error);
                res.status(500).send('error al obtener datos de la base de datos');
            }     
        }
        else {
            try {
                const resultValidation = validationResult(req);
                let newProduct = await db.Producto.create({
                    nombre: req.body.nombre,
                    descripcion: req.body.descripcion,
                    historia : req.body.historia,
                    descuento : req.body.descuento,
                    imagen: imageName,
                    requisitos: req.body.requisitos,
                    oferta: hasOffert,
                    precio: req.body.precio,
                    id_categoria : req.body.categorias
                })
                productoId = newProduct.id
                res.redirect('/products/productDetail/' + productoId);
            }
            
            catch(error){
                console.error('error al obtener datos de la base de datos', error);
                res.status(500).send('error al obtener datos de la base de datos');
            }     
        }
        
        
    },
    delete: async (req, res) =>{
        try{
            
            await db.Producto.destroy({
                where: {
                    id : req.params.id
                }
            })
            res.redirect('/')
        }
        catch{
            return res.send('<h1> Ha ocurrido un error </h1>')
        }
    },
    
    edit: async (req, res) => {

        const productoSeleccionado = await db.Producto.findByPk(req.params.id, {
            include: ['categoria']
        });
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
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0){
            try {
                
                const productoSeleccionado = await db.Producto.findByPk(req.params.id, {
                    include: ['categoria']
                });
                res.render('productEdit', {productoSeleccionado, errors :resultValidation.mapped()})
    
            } 
            catch(error){
                console.error('error al obtener datos de la base de datos', error);
                res.status(500).send('error al obtener datos de la base de datos');
            }     
        }
        else{
            try {
                const productoSeleccionado = await db.Producto.findByPk(req.params.id);
                const productoImagen = productoSeleccionado.imagen
            
            
            await db.Producto.update({
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                historia : req.body.historia,
                descuento : req.body.descuento,
                imagen: req.file ? req.file.filename : productoImagen,
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
            catch(error){
                console.error('error al obtener datos de la base de datos', error);
                res.status(500).send('error al obtener datos de la base de datos');
            }
        }     
        
    }
}

module.exports = productsControllers;