const path = require('path')

const mainControllers = {
    index:  ( req, res ) =>{
        const pathHome = path.join(__dirname, '..' , '..' , 'views/index.html')
        res.sendFile(pathHome);
      }
}

module.exports = mainControllers;