

const User = require('../models/user')


exports.getlogin = (req, res, next) => {

    // console.log("object :>> ", products);
    res.render("auth/login", {
        title: "Login",
        pageTitle: "login",
        path: "login",
        isauthntivated: req.session.islogin
    });

};

exports.postlogin = (req, res, next) => {
    User.findById('6696ce5201ee1fbafdbc8aa5')
        .then((user) => {

            req.session.user = user;
            req.session.islogin = req.body.password == 'true' ? true : false

            req.session.save(err => {
                console.log(err);
                res.redirect('/');
            });

        })
        .catch((err) => {
            console.log(err);
        });

};




exports.postLogout = (req, res, next) => {

    req.session.destroy((err) => {

        res.redirect('/')
    })

};
