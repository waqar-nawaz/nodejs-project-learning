const Product = require("../models/productModel");
const readline = require("readline");
const Order = require("../models/order");



exports.listProduct = async (req, res, next) => {
  Product.find()
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
  Product.findById(req.params.productId)
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
  Product.find()
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
  //  await Product.getFetchAll().then(([products,fileData]) => {

  //   });
};

exports.getCart = async (req, res, next) => {


  // User.find().then((user) => {

  //   console.log('user ', user[0].cart.items);
  //   res.render("shop/cart", {
  //     title: "Cart",
  //     products: user[0].cart.items,
  //     pageTitle: "Carts",
  //     path: "/cart",
  //   });

  // }).catch((err) => {
  //   console.log(err);

  // });

  req.user.populate('cart.items.productId').then((user) => {

    res.render("shop/cart", {
      title: "Cart",
      products: user.cart.items,
      pageTitle: "Carts",
      path: "/cart",
    });

  }).catch((err) => {

  });



};
exports.getOrder = async (req, res, next) => {


  Order.find({ 'user.userId': req.user._id }).then((order) => {
    res.render("shop/order", {
      title: "Order",
      pageTitle: "Order",
      order: order,
      path: "/order",
    });
  }).catch((err) => {

  });


};

exports.deleteCartProduct = (req, res, next) => {
  let productId = req.body.productId;

  req.user.deletCartItem(productId)

  res.redirect('/cart')

};

exports.postOrder = (req, res, next) => {

  req.user.populate('cart.items.productId').then((user) => {

    const orderarray = user.cart.items.map((res) => {
      return { productdata: { ...res.productId._doc }, quantity: res.quantity }
    })

    const order = new Order({ product: orderarray, user: { name: req.user.name, userId: req.user._id } })
    return order.save();

  }).then((result) => {

    res.redirect('/order')

    req.user.removeAllcartItem()
  }).catch((err) => {

    console.log('order eror', err);
  });

};
