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
        }catch (error){
            return res.send("<h2>A acurrido un error en la busqueda del id</h2>",error)
        }
    },
    productAdd: async (req, res) => {
        try{
            const productoSeleccionado = await db.Producto.findAll()
            res.render('productAdd', { productoSeleccionado })
        }catch (error){
            return res.send("<h2>A acurrido un error en la busqueda del id</h2>",error)
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
            await res.status(200).send({status: 200, mesagge: "product create"})
            return res.redirect("/")
        }catch (error){
            return res.send("<h2>A acurrido un error en el algoritmo</h2>",error)
        }
    },
    edit: async(req, res) => {
        try{
            const productoSeleccionado = await db.Producto.findByPk(req.params.id)
            console.log("estoy en edit");
            res.render('productEdit', { productoSeleccionado })
        }catch (error){
            return res.send("<h2>A acurrido un error en la busqueda del id</h2>",error)
        }
    },
    update: async(req, res) => {
        try{
            await db.Producto.update(...req.body,{where:{id: req.params.id}})
            return res.redirect("/")
        }catch (error){
            return res.send("<h2>A acurrido un error en el algoritmo</h2>",error)
        }
    },
    delete: async(req, res) =>{
        try{
            const productoSeleccionado = await db.Producto.findByPk(req.params.id)
            res.render('productEdit', { productoSeleccionado })
        }catch (error){
            return res.send("<h2>A acurrido un error en la busqueda del id</h2>",error)
        }
    },
    destroy: async (req, res) =>{
        try{
            const destroyProduct = await db.Producto.destroy({where:{id: req.params.id}})
            if(!destroyProduct){
                return res.status(404).send({mesagge: "Error delete"})
            }
            return res.redirect("/")
        }catch (error){
            return res.send("<h2>A acurrido un error en el algoritmo</h2>", error)
        }
    }
}

module.exports = productsControllers;