const path = require('path');
const fs = require('fs');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
let products = require('../data/productsDataBase.json')

const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const mainControllers = {
  index: async (req, res) => {
    //antes se utilizaba esta forma
    /*const pathHome = path.join(__dirname, '..' , '..' , 'views/index.html')
    res.sendFile(pathHome);*/
    loggedUser = false;
        if (req.session.userLogin || req.cookies.user) {
            loggedUser = true;
            console.log('existe usuario logeado y el mail es', req.session.userLogin)
        }
    //dividir en productos con oferta y sin ooferta
    const productWithOffert = await db.Producto.findAll({
      where: {
        oferta: true
      }
    })
    //products.filter((product) => product.inOffert == true)
    const productWithOutOffert = await db.Producto.findAll({
      where: {oferta: false }})
    //products.filter((product) => product.inOffert == false)
    


    res.render('index', { productWithOffert, productWithOutOffert, loggedUser })
  },
  search: async (req, res) => {
    //caputrar la informacion de queryParams
    const busqueda = req.query.keywords;


    //extraer los productos que macheen con la vista52.56 minutos video
    const productoBuscado = await db.Producto.findAll({
      where:{
        nombre: {[Op.like]:'%'+busqueda+'%'}
      }
    })
    /*products.filter((product) => product.name.toLowerCase().
      includes(busqueda.toLowerCase()))*/


    //vista
    res.render('results', { productoBuscado, busqueda })

  }
}

module.exports = mainControllers;