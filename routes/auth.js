

const express = require("express");
const routes = express.Router();
const auth = require("../controllers/auth");

routes.get("/login", auth.getlogin);
routes.post("/login", auth.postlogin);
routes.post("/logout", auth.postLogout);
routes.get("/signup", auth.getsignup);
routes.post("/signup", auth.postsignup);


module.exports = routes;