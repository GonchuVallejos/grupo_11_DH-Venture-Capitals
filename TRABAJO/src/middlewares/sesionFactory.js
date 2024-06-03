
const sesionFactory = {
    userLogin : (req, res, next) => {
        console.log(req.session)
        console.log('estoy leyendo la cookie' + req.cookies.user)
        if (req.session.userLogin || req.cookies.user){
            res.redirect('/')
        }
        next();
    }
}


module.exports = sesionFactory