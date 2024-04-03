const path = require('path')
const fs = require('fs');
let products = require('../data/productsDataBase.json')
const crypto = require('crypto'); //Para generar los id
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');

const db = require('../database/models');
const { response } = require('express');
const sequelize = db.sequelize;


const productsControllers = {

    productDetail: async (req, res) => {
        //productoId = req.params.id
        try{
            const productoSeleccionado = await db.Producto.findByPk(req.params.id)
            res.render('productDetail', { productoSeleccionado })
        }catch{
            return res.send("<h2>A acurrido un error en la busqueda del id</h2>")
        }
    },
    productAdd: async (req, res) => {
        try{
            const productoSeleccionado = await db.Producto.findAll()
            res.render('productAdd', { productoSeleccionado })
        }catch{
            return res.send("<h2>A acurrido un error en la busqueda del id</h2>")
        }
    },
    store: async (req, res) => {
        /*let hasDiscount = parseInt(req.body.descuento, 10);
        let hasOffert = false;
        if (hasDiscount > 0){ 
            hasOffert = true;
        }*/
        try{
            await db.Producto.create(...req.body)
                .then(product => {return res.status(200).json({
                    /*aca se añadiran los datos*/
                })})
            return res.redirect("/")
        }catch{
            return res.send("<h2>A acurrido un error en el algoritmo</h2>")
        }
    },
    edit: async(req, res) => {
        try{
            const productoSeleccionado = await db.Producto.findByPk(req.params.id)
            console.log("estoy en edit");
            res.render('productEdit', { productoSeleccionado })
        }catch{
            return res.send("<h2>A acurrido un error en la busqueda del id</h2>")
        }
    },
    update: async(req, res) => {
        try{
            await db.Producto.update(...req.body,{where:{id: req.params.id}})
                .then(product => {return res.status(200).json({
                    /*aca se añadiran los datos*/
                })})
            return res.redirect("/")
        }catch{
            return res.send("<h2>A acurrido un error en el algoritmo</h2>")
        }
    },
    delete: async(req, res) =>{
        try{
            const productoSeleccionado = await db.Producto.findByPk(req.params.id)
            res.render('productEdit', { productoSeleccionado })
        }catch{
            return res.send("<h2>A acurrido un error en la busqueda del id</h2>")
        }
    },
    destroy: async (req, res) =>{
        try{
            await db.Producto.destroy({where:{id: req.params.id}})
                .then(result => {return res.status(200).json({
                    /*aca se añadiran los datos*/
                })})
            return res.redirect("/")
        }catch{
            return res.send("<h2>A acurrido un error en el algoritmo</h2>")
        }
    }
}

module.exports = productsControllers;