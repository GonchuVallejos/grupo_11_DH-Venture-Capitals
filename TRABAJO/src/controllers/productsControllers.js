const path = require('path')
const fs = require('fs');
let products = require('../data/productsDataBase.json')
const crypto = require('crypto'); //Para generar los id
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');

const db = require('../database/models');
const { response } = require('express');
const sequelize = db.sequelize;


const productsControllers = {
    /*Listar*/
    'list': (req, res) => {
        db.Producto.findAll({include:["requisitos", "historia", "precio"]})
            .then(productos => {
                res.render('productList.ejs', {productos})
                //res.json(movies)
            })
        },
    /*Ver Detalles*/
    'detail':(req, res)=>{
        db.Producto.findByPk(req.params.id)
            .then(producto =>{res.render('productDetail.ejs',{producto})})
    },
    //---------Aqui dispongo las rutas para trabajar con el CRUD---------

    /*Crear*/
    productAdd: async (req, res) => {
        try{
            const productoSeleccionado = await db.Producto.findAll()
            res.render('productAdd', { productoSeleccionado })
        }catch (error){
            return res.send("A acurrido un error en la busqueda del id",error)
        }
    },
    create: async (req, res) => {
        try{
            await db.Producto.create(...req.body)
            await res.status(200).send({status: 200, mesagge: "product create"})
            return res.redirect("/")
        }catch (error){
            return res.send("A acurrido un error en el algoritmo",error)
        }
    },
    /*Editar*/
    edit: async(req, res) => {
        try{
            const productoSeleccionado = await db.Producto.findByPk(req.params.id)
            console.log("estoy en edit");
            res.render('productEdit', { productoSeleccionado })
        }catch (error){
            return res.send("A acurrido un error en la busqueda del id",error)
        }
    },
    update: async(req, res) => {
        try{
            await db.Producto.update(...req.body,{where:{id: req.params.id}})
            return res.redirect("/")
        }catch (error){
            return res.send("A acurrido un error en el algoritmo",error)
        }
    },
    /*Eliminar*/
    delete: async(req, res) =>{
        try{
            const productoSeleccionado = await db.Producto.findByPk(req.params.id)
            res.render('productdetail', { productoSeleccionado })
        }catch (error){
            return res.send("A acurrido un error en la busqueda del id",error)
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
            return res.send("A acurrido un error en el algoritmo", error)
        }
    },
    /*Carrito*/
    productCart: (req, res) => {
            res.render('productCart')
    },
}

module.exports = productsControllers;