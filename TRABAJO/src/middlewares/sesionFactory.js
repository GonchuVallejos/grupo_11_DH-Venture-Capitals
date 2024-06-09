
const sesionFactory = {
    userLogin : (req, res, next) => {
        console.log(req.session)
        console.log('estoy leyendo la cookie' + req.cookies.user)
        if (req.session.userLogin || req.cookies.user){
            res.redirect('/')
        }
        next();
    },
    userToAddProduct: (req, res, next) => {
        if (!req.session.userLogin && !req.cookies.user){
            req.session.lastUrl = req.originalUrl;
            console.log('la url es', req.session.lastUrl)
            res.redirect('/users/login')
        }
        next();
    },
}


module.exports = sesionFactory