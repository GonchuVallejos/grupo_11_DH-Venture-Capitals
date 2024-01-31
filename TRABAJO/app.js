const express = require('express');

const app = express();
const path = require('node:path');

//Port
const port = 3000

// Public (static) Listen Server

app.use(express.static('public'))

//routes direction
const userRoutes = require('./src/routes/userRoutes')

const mainRoutes = require('./src/routes/mainRoutes')



// Routes
 app.get('/', mainRoutes)

 app.get('/login', userRoutes)

 app.get('/register', userRoutes)


app.get('/productCart', ( req, res ) =>{
    const pathCart = path.join(__dirname, 'views/productCart.html')
    res.sendFile(pathCart);
})

app.get('/productDetail', ( req, res ) =>{
    const pathHome = path.join(__dirname, 'views/productDetail.html')
    res.sendFile(pathHome);
})


app.listen( port, () => console.log(`Server up on PORT:  http://localhost:3000`) )
