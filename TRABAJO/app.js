const express = require('express');

const app = express();
const path = require('node:path');
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE

//Port
const PORT = process.env.PORT || 3000;

// middleWares
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//EJS config
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './src/views/') )

// Public (static) Listen Server

app.use(express.static('public'))

// Routes

app.use('/', require('./src/routes/index.routes.js'))

// cuando hay un error 404
//app.use((req, res, next) => next(createError(404)));


app.listen(PORT, () => console.log(`Server up on port: http://localhost:${PORT}`))
