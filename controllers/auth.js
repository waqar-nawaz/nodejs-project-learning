

const User = require('../models/user')
const bcryptjs = require('bcryptjs')


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
    let email = req.body.email
    let password = req.body.password
    User.findOne({ email })
        .then((user) => {

            if (!user) {
                return res.redirect('/login')
            }

            bcryptjs.compare(password, user.password).then((password) => {

                console.log('password', password);
                if (password) {
                    req.session.user = user;
                    req.session.islogin = true

                    return req.session.save(err => {

                        res.redirect('/');
                    });
                }
                return res.redirect('/login')


            }).catch((user) => {

                console.log('waht is user status', user);
            })

        })
        .catch((err) => {
            console.log(err);
        });

};
exports.getsignup = (req, res, next) => {

    // console.log("object :>> ", products);
    res.render("auth/signup", {
        title: "Sign Up",
        pageTitle: "sign Up",
        path: "signup",
        isauthntivated: req.session.islogin
    });

};

exports.postsignup = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then((user) => {

            if (user) {
                console.log('finduser');
                return res.redirect('/signup')
            }

            return bcryptjs.hash(req.body.password, 12).then((hasspassword) => {
                let userdata = {
                    email: req.body.email,
                    password: hasspassword,
                    cart: { items: [] }
                }
                const usersave = new User(userdata)
                return usersave.save();
            })

        }).then((usercreate) => {
            if (usercreate) {
                res.redirect('/login')
            }
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
