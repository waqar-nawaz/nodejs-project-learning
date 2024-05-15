const ProductModel = require("../models/productModel");
const Cart = require("../models/cart");

const Sequelize = require('sequelize')

exports.listProduct = async (req, res, next) => {
  ProductModel.findAll().then((products)=>{
    console.log('object :>> ', products);
    res.render("shop/product-list", {
      addProduct: products,
      title: "Products",
      pageTitle: "Products",
      path: "/products",
    });
  }).catch((err)=>{
    console.log('err :>> ', err);
   
  })
 
};

exports.getProduct = (req, res, next) => {

ProductModel.findByPk(req.params.productId).then((result)=>{
  console.log('result :>> ', result.dataValues);
  res.render("shop/product-detail", {
    singleProduct:result,
    title: "Products Detail",
    pageTitle: "Products Detail",
    path: "",
  });
}).catch((error)=>{
  console.log('error :>> ', error);
})
  // ProductModel.getSingleProduct(req.params.productId).then(([singleProduct,fileData]) => {
   
  // });
};

exports.getIndex = async (req, res, next) => {

  ProductModel.findAll().then((products)=>{
    console.log('object :>> ', products);
    res.render("shop/index", {
      addProduct: products,
      title: "Shops",
      pageTitle: "shops",
      path: "/",
    });
  }).catch((err)=>{
    console.log('err :>> ', err);
   
  })
//  await ProductModel.getFetchAll().then(([products,fileData]) => {
    
//   });
};

exports.getCart = async (req, res, next) => {
  let cartItemData = [];
  Cart.getCartItem((cart) => {
    let totlprice = cart.totalPrice;

    ProductModel.getFetchAll().then((product) => {
      for (const pro of product) {
        cart.products?.forEach((element) => {
          if (pro.id === element.id) {
            cartItemData.push({ product: pro, qty: element.qty });
          }
        });
      }

      // console.log("cartItemData :>> ", cartItemData);
      res.render("shop/cart", {
        title: "Cart",
        products: cartItemData,
        totalprice: totlprice,
        pageTitle: "Carts",
        path: "/cart",
      });
    });
  });
};

exports.deleteCartProduct = (req, res, next) => {
  ProductModel.getSingleProduct(req.body.productId).then((singleProduct) => {
    Cart.deleteCart(req.body.productId, singleProduct.price);
    res.redirect("/cart");
  });
};
