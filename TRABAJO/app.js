const express = require('express');

const app = express();
const path = require('node:path');

// Routes
 app.get('/', ( req, res ) =>{
   const pathHome = path.join(__dirname, 'views/index.html')
   res.sendFile(pathHome);
 })

app.get('/productCart', ( req, res ) =>{
    const pathCart = path.join(__dirname, 'views/productCart.html')
    res.sendFile(pathCart);
})

app.get('/index', ( req, res ) =>{
    const pathHome = path.join(__dirname, 'views/index.html')
    res.sendFile(pathHome); })
    
app.get('/login', ( req, res ) =>{
    const pathHome = path.join(__dirname, 'views/login.html')
    res.sendFile(pathHome);
})

app.get('/productDetail', ( req, res ) =>{
    const pathHome = path.join(__dirname, 'views/productDetail.html')
    res.sendFile(pathHome);
})

app.get('/register', ( req, res ) =>{
    const pathHome = path.join(__dirname, 'views/register.html')
    res.sendFile(pathHome);})

// Public (static) Listen Server

app.use(express.static('public'))

app.listen( 3000, () => console.log(`Server up on PORT:  http://localhost:3000`) )
