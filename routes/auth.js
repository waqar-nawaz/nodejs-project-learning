

const express = require("express");
const routes = express.Router();
const auth = require("../controllers/auth");
const { body } = require('express-validator');



routes.get("/login", auth.getlogin);
routes.post("/login", auth.postlogin);
routes.post("/logout", auth.postLogout);
routes.get("/signup", auth.getsignup);
routes.post("/signup", body('email').isEmail().withMessage('Plz Inter correct email'), auth.postsignup);


module.exports = routes;