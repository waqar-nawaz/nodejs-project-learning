const Products = require("../models/productModel");
const Cart = require("../models/cart");

const fs = require("fs");
const path = require("path");

exports.getProduct = (req, res) => {
  // res.sendFile(path.join(rootDir, "views", "add-product.html"));
  res.render("admin/product-edit", {
    pageTitle: "add-product",
    path: "admin/add/product",
    editMode: false,
  });
};

exports.editProduct = (req, res) => {
  Products.findByPk(req.params.productId)
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

  req.user.createProduct({
    title: req.body.product_name,
    description: req.body.description,
    imgUrl: req.body.imgUrl,
    price: req.body.price,
    // UserId: req.user.id
  }) .then((result) => {
      res.redirect("/admin/product");
    })
    .catch((err) => console.log("err >> ", err));
};

// function convertImageToBase64(imageName) {
//   const imagePath = path.join("C:/Users/DELL/Pictures/", imageName);
//   const imageData = fs.readFileSync(imagePath);
//   const base64Image = Buffer.from(imageData).toString("base64");
//   return "data:image/png;base64," + base64Image;
// }

exports.postEditProduct = (req, res) => {
  let data = {
    title: req.body.product_name,
    imgUrl: req.body.imgUrl,
    price: req.body.price,
    description: req.body.description,
  };
  const id = req.body.productId;

  Products.update(data, { where: { id: id } })
    .then((update) => {
      console.log("update :>> ", update);
      res.redirect("/admin/product");
    })
    .catch((err) => {
      
    });
};

exports.deleteProduct = (req, res, next) => {
  const id = req.params.deleteId;

  Products.destroy({ where: { id: req.params.deleteId } })
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
  Products.findAll().then((products) => {
    res.render("admin/product-list", {
      addProduct: products,
      title: "Products",
      pageTitle: "admin product",
      path: "/admin/product",
    });
  });
};

exports.addToCart = (req, res, next) => {
  // console.log("req.body.productId :>> ", req.body.productId);
  let id = req.body.productId;
  product.getSingleProduct(id).then((product) => {
    Cart.addToCart(id, product.price);
  });

  res.redirect("/cart");
};
