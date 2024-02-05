const express = require('express');

const app = express();
const path = require('node:path');

//Port
const PORT = process.env.PORT || 3000;


//EJS config
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './src/views/') )

// Public (static) Listen Server

app.use(express.static('public'))

// Routes

app.use('/', require('./src/routes/index.routes.js'))



app.listen(PORT, () => console.log(`Server up on port: http://localhost:${PORT}`))
