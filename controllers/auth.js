




exports.getlogin = (req, res, next) => {

    // console.log("object :>> ", products);
    res.render("auth/login", {
        title: "Login",
        pageTitle: "login",
        path: "login",
    });

};

exports.postlogin = (req, res, next) => {

    console.log(req.body)

    res.setHeader('Set-Cookie', 'myCookie=false; HttpOnly');
    res.write('set cookies but not showing')
};





