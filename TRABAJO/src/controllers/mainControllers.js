const path = require('path')

const mainControllers = {
  index: (req, res) => {
    //antes se utilizaba esta forma
    /*const pathHome = path.join(__dirname, '..' , '..' , 'views/index.html')
    res.sendFile(pathHome);*/
    res.render('index')
  }
}

module.exports = mainControllers;