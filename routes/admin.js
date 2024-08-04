// const rootDir = require("../utils/path");
// const path = require("path");

const isauth = require('../middleware/isauth');


const express = require("express");
const routes = express.Router();
const userController = require('../controllers/admin');
const Product = require('../models/productModel');


routes.get("/add-product", isauth, userController.getProduct);

routes.post("/add-product", userController.postProduct);

routes.post("/edit-product", userController.postEditProduct);

routes.post("/cart", userController.PostToCart);

routes.get("/product", userController.getProductlist);

routes.get("/edit-product/:productId", userController.editProduct);

routes.get("/product-delete/:deleteId", userController.deleteProduct);

module.exports = routes;
exports.postEditProduct = (req, res) => {
    const id = req.body.productId;
    let data = {
        title: req.body.product_name,
        imgUrl: req.file.path,
        price: req.body.price,
        description: req.body.description,
    };

    console.log('data object', req.file.path);
    req.file == null || req.file == undefined ? delete data.imgUrl : '';

    // console.log('data', data);
    Product.updateOne({ _id: id }, data)
        .then((update) => {
            console.log("update :>> ", update);
            res.redirect("/admin/product");
        })
        .catch((err) => {
            console.log("err :>> ", err);
        });
};
