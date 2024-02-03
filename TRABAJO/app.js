const express = require('express');

const app = express();
const path = require('node:path');

//Port
const port = 3000


//EJS config
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './src/views/') )

// Public (static) Listen Server

app.use(express.static('public'))

//routes direction
const userRoutes = require('./src/routes/userRoutes')

const mainRoutes = require('./src/routes/mainRoutes')

const productsRoutes = require('./src/routes/productsRoutes')

// Routes
 app.get('/', mainRoutes)

 app.get('/login', userRoutes)

 app.get('/register', userRoutes)

 app.get('/productCart', userRoutes)

 app.get('/productDetail', productsRoutes)

app.listen( port, () => console.log(`Server up on PORT:  http://localhost:3000`) )
