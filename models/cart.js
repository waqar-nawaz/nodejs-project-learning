const path = require("path");
const fs = require("fs");

const rootDirectory = require("../utils/path");
const product = require("./productModel");
const p = path.join(rootDirectory, "Data", "cart.json");

module.exports = class Cart {
  static addToCart(id, totalPrice) {
    fs.readFile(p, (err, fileConted) => {
      let cart = { products: [], totalPrice: 0 };

      if (!err) {
        cart = JSON.parse(fileConted);
      }

      const existingProductIndex = cart.products.findIndex(
        (pro) => pro.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updateProduct;
      if (existingProduct) {
        // updateProduct = cart.products[existingProductIndex];

        cart.products[existingProductIndex].qty =
          cart.products[existingProductIndex].qty + 1;

        //    updateProduct = {...existingProduct}
        //    updateProduct.qty = updateProduct.qty +1
        //    cart.products[existingProductIndex]= updateProduct
      } else {
        let newProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, newProduct]; //in current array add another object like newproduct in this case
      }

      cart.totalPrice = cart.totalPrice + +totalPrice;

      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  // Delete Cart
  static deleteCart(id, totalPrice) {
    fs.readFile(p, (err, filecontent) => {
      if (err) {
        return;
      }

      let CopyFromCart = { ...JSON.parse(filecontent) };

      // find the particular product qty and remove that price according qty from cart
      let qtyobject = CopyFromCart.products.find((pro) => pro.id === id);

      if(!qtyobject){
        return;
      }
      let productqty = qtyobject.qty;

      // Delete specific card
      let products = CopyFromCart.products.filter((pro) => pro.id !== id);
      CopyFromCart.totalPrice =
        CopyFromCart.totalPrice - totalPrice * productqty;
      CopyFromCart.products = products;
      fs.writeFile(p, JSON.stringify(CopyFromCart), (err) => {
        // console.log("some Error", err);
      });
    });
  }

  static getCartItem(callback) {
    fs.readFile(p, (err, fileConted) => {
      if (err) {
        callback([]);
      } else {
        callback(JSON.parse(fileConted));
      }
    });
  }
};
