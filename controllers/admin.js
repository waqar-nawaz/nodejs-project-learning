
const fs = require("fs");
const path = require("path");
const Product = require("../models/productModel");
const User = require("../models/user");
const { log } = require("console");

exports.getProduct = (req, res) => {
  // res.sendFile(path.join(rootDir, "views", "add-product.html"));
  res.render("admin/product-edit", {
    pageTitle: "add-product",
    path: "admin/add/product",
    editMode: false,
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
      });
    })
    .catch((error) => {
      console.log("error :>> ", error);
    });
};

exports.postProduct = (req, res) => {



  let title = req.body.product_name
  let description = req.body.description
  let imgUrl = req.body.imgUrl
  let price = req.body.price
  let userId = req.user
  // UserId: req.user.id
  const product = new Product({ title, price, description, imgUrl, userId })

  product.save()
    .then((result) => {
      console.log('create Product');
      res.redirect("/admin/product");
    })
    .catch((err) => console.log("err >> ", err));
};



exports.postEditProduct = (req, res) => {
  let data = {
    title: req.body.product_name,
    imgUrl: req.body.imgUrl,
    price: req.body.price,
    description: req.body.description,
  };
  const id = req.body.productId;

  Product.updateOne({ _id: id }, data)
    .then((update) => {
      console.log("update :>> ", update);
      res.redirect("/admin/product");
    })
    .catch((err) => {
      console.log("err :>> ", err);
    });
};

exports.deleteProduct = (req, res, next) => {
  const id = req.params.deleteId;
  Product.findByIdAndDelete(id)
    .then((result) => {
      res.redirect("/admin/product");
    })
    .catch((err) => {
      console.log("err :>> ", err);
    });

  // Products.findByPk(id).then((result)=>{

  // return  result.destroy();
  // }).then((products)=>{
  //   res.redirect("/admin/product");

  // })
  // .catch((er)=>{
  //   console.log('er :>> ', er);
  // })
};

exports.getProductlist = async (req, res, next) => {
  Product.find().select('title price imgUrl description _id').populate('userId', 'email').then((products) => {

    console.log('with user', products)
    res.render("admin/product-list", {
      addProduct: products,
      title: "Products",
      pageTitle: "admin product",
      path: "/admin/product",
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
