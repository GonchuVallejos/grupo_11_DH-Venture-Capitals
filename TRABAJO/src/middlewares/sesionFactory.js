
const sesionFactory = {
    userLogin : (req, res, next) => {
        console.log(req.session)
        if (req.session.userLogin){
            res.redirect('/')
        }
        next();
    }
}


module.exports = sesionFactory