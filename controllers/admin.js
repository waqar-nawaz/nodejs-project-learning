
const fs = require("fs");
const path = require("path");
const Product = require("../models/productModel");
const User = require("../models/user");
const mongoose = require('mongoose');
const deleteImage = require('../utils/fileDelete')
exports.getProduct = (req, res) => {
  // res.sendFile(path.join(rootDir, "views", "add-product.html"));
  res.render("admin/product-edit", {
    pageTitle: "add-product",
    path: "admin/add/product",
    editMode: false,
    isauthntivated: req.session.islogin
  });
};

exports.editProduct = (req, res) => {

  Product.findById({ _id: req.params.productId })
    .then((result) => {
      if (!result) {
        return res.redirect("/");
      }
      res.render("admin/product-edit", {
        pageTitle: "Edit Product",
        path: "admin/edit/product",
        editMode: true,
        product: result,
        isauthntivated: req.session.islogin
      });
    })
    .catch((error) => {
      console.log("error :>> ", error);
    });
};

exports.postProduct = (req, res, next) => {



  let title = req.body.product_name
  let description = req.body.description
  let imgUrl = req.file.path
  let price = req.body.price
  let userId = req.user
  // UserId: req.user.id
  // console.log(req.file);
  const product = new Product({ title, price, description, imgUrl, userId })

  product.save()
    .then((result) => {
      // console.log('create Product');
      res.redirect("/admin/product");
    })
    .catch((err) => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};



exports.postEditProduct = (req, res) => {
  // const id = req.body.productId;
  const { productId: id, product_name: title, price, description } = req.body
  const data = { title, description, title, price }

  Product.findById(id).then((product) => {
    if (req.file) {
      deleteImage(product.imgUrl)
      // console.log('delete image', product.imgUrl)
      data.imgUrl = req.file.path
    }

    return Product.updateOne({ _id: id }, data)

  }).then((update) => {
    // console.log("update :>> ", update);
    res.redirect("/admin/product");
  }).catch((err) => {
    console.log("err :>> ", err);
  });
};


exports.deleteProduct = (req, res, next) => {
  const id = req.params.deleteId;
  Product.findById(id).then((product) => {


    if (!product) {
      return res.redirect("/admin/product");
    }

    deleteImage(product.imgUrl)
    return Product.findByIdAndDelete(id)
      .then((result) => {
        res.redirect("/admin/product");
      })

  }).catch((err) => {
    console.log("err :>> ", err);
  });

};

exports.getProductlist = async (req, res, next) => {
  Product.find().select('title price imgUrl description _id').populate('userId', 'email').then((products) => {

    // console.log('with user', products)
    res.render("admin/product-list", {
      addProduct: products,
      title: "Products",
      pageTitle: "admin product",
      path: "/admin/product",
      isauthntivated: req.session.islogin
    });
  }).catch((err) => {

  });

};

exports.PostToCart = (req, res, next) => {
  // console.log("req.body.productId :>> ", req.body.productId);
  let proID = req.body.productId;

  Product.findById(proID).then((product) => {

    req.user.addtoCart(product)

  }).then((result) => {
    res.redirect('/cart')
  }).catch((err) => {

    console.log('res errro', err);
  });

};
