// const path = require('path')
// const rootDir = require('../utils/path')
// const addProduct = require('./admin')


const express = require('express')
const routes = express.Router();
const shopController = require('../controllers/shop')

routes.get("/", shopController.getIndex);

routes.get("/cart",shopController.getCart);

routes.get("/products",shopController.listProduct)

routes.get("/product/:productId",shopController.getProduct)
  
routes.post("/cart-delete", shopController.deleteCartProduct);


  module.exports = routes