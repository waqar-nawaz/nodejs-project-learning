

const express = require("express");
const routes = express.Router();
const auth = require("../controllers/auth");

routes.get("/login", auth.getlogin);
routes.post("/login", auth.postlogin);


module.exports = routes;