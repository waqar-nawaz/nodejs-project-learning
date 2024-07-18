




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

    req.session.islogin = req.body.password == 'true' ? true : false
    console.log(typeof req.body.password)

    res.redirect('/')

};





