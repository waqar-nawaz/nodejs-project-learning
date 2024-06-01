const ProductModel = require("../models/productModel");
const Cart = require("../models/cart");

const Sequelize = require("sequelize");

exports.listProduct = async (req, res, next) => {
  ProductModel.findAll()
    .then((products) => {
      console.log("object :>> ", products);
      res.render("shop/product-list", {
        addProduct: products,
        title: "Products",
        pageTitle: "Products",
        path: "/products",
      });
    })
    .catch((err) => {
      console.log("err :>> ", err);
    });
};

exports.getProduct = (req, res, next) => {
  ProductModel.findByPk(req.params.productId)
    .then((result) => {
      console.log("result :>> ", result);
      res.render("shop/product-detail", {
        singleProduct: result,
        title: "Products Detail",
        pageTitle: "Products Detail",
        path: "",
      });
    })
    .catch((error) => {
      console.log("error :>> ", error);
    });
  // ProductModel.getSingleProduct(req.params.productId).then(([singleProduct,fileData]) => {

  // });
};

exports.getIndex = async (req, res, next) => {
  ProductModel.findAll()
    .then((products) => {
      console.log("object :>> ", products);
      res.render("shop/index", {
        addProduct: products,
        title: "Shops",
        pageTitle: "shops",
        path: "/",
      });
    })
    .catch((err) => {
      console.log("err :>> ", err);
    });
  //  await ProductModel.getFetchAll().then(([products,fileData]) => {

  //   });
};

exports.getCart = async (req, res, next) => {
  req.user
    .getCart()
    .then((carts) => {
      return carts
        .getProducts()
        .then((products) => {
          res.render("shop/cart", {
            title: "Cart",
            products: products,
            pageTitle: "Carts",
            path: "/cart",
          });

          console.log("car product", products);
        })
        .catch((err) => {});
    })
    .catch((err) => {});
};
exports.getOrder = async (req, res, next) => {
  res.render("shop/order", {
    title: "Order",
    pageTitle: "Order",
    path: "/order",
  });
};

exports.deleteCartProduct = (req, res, next) => {
  let productId = req.body.productId;
  req.user
    .getCart()
    .then((cart) => {
      return cart
        .getProducts({ where: { id: productId } })
        .then((prodcut) => {
          let prodcuts = prodcut[0];
          return prodcuts.cartItem.destroy();
        })
        .then(() => {
          res.redirect("/cart");
        });
    })
    .catch((err) => {
      console.log(err);
    });

  // ProductModel.getSingleProduct(req.body.productId).then((singleProduct) => {
  //   Cart.deleteCart(req.body.productId, singleProduct.price);
  // });
};
