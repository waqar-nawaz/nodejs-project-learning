// const rootDir = require("../utils/path");
// const path = require("path");


const express = require("express");
const routes = express.Router();
const userController = require('../controllers/admin')


routes.get("/add-product", userController.getProduct);

routes.post("/add-product", userController.postProduct);

routes.post("/edit-product", userController.postEditProduct);

// routes.post("/cart", userController.addToCart);

routes.get("/product", userController.getProductlist);

routes.get("/edit-product/:productId", userController.editProduct);

routes.get("/product-delete/:deleteId", userController.deleteProduct);

module.exports = routes;
