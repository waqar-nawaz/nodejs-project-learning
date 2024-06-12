// const Cart = require("../models/cart");

const fs = require("fs");
const path = require("path");
// const CartItem = require("../models/cart-item");
const Product = require("../models/productModel");
const getDb = require('../utils/database').getDb

exports.getProduct = (req, res) => {
  // res.sendFile(path.join(rootDir, "views", "add-product.html"));
  res.render("admin/product-edit", {
    pageTitle: "add-product",
    path: "admin/add/product",
    editMode: false,
  });
};

exports.editProduct = (req, res) => {
  Product.getSingleProduct(req.params.productId)
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
  // UserId: req.user.id
  const product = new Product(title, price, description, imgUrl, null, req.user._id)

  product.save()
    .then((result) => {
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

  Product.updateProduct(id, data)
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
  Product.deleteProduct(id)
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
  Product.fetchAll().then((products) => {
    res.render("admin/product-list", {
      addProduct: products,
      title: "Products",
      pageTitle: "admin product",
      path: "/admin/product",
    });
  }).catch((err) => {

  });

};

exports.addToCart = (req, res, next) => {
  // console.log("req.body.productId :>> ", req.body.productId);
  let proID = req.body.productId;
  let fetchcart;
  let oldQuantity;
  let newQuantity = 1;

  req.user
    .getCart()
    .then((cart) => {
      fetchcart = cart;
      return cart.getProducts({ where: { id: proID } });
    })
    .then((products) => {
      let prodcut;
      if (products.length > 0) {
        prodcut = products[0];
      }
      if (prodcut) {
        oldQuantity = prodcut.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        console.log("cardcardacar item ", prodcut.cartItem.dataValues);
        return prodcut;
      }

      return Products.findByPk(proID);
    })
    .then((product) => {
      return fetchcart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .then((data) => {
      res.redirect("/cart");
    })
    .catch((err) => { });
};
