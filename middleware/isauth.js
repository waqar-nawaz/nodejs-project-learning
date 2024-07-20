const path = require('path');

module.exports = (req, res, next) => {

    if (!req.session.islogin) {


        return res.redirect('/login')
    }
    next();

};
