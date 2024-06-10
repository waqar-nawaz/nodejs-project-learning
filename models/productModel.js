
const getDb = require('../utils/database').getDb
const mongodb = require('mongodb');


class Product {
  constructor(title,price,description,imgUrl) {
    this.title = title
    this.price = price
    this.description = description
    this.imgUrl = imgUrl
  }


  save(){
    let db = getDb();
    return db.collection('product').insertOne(this).then((product) => {
      console.log('productssssss',product);
    }).catch((err) => {
      console.log(err);
    });
  }

  static fetchAll(){
    let db = getDb()
   return db.collection('product').find().toArray().then((product) => {
      return product
    }).catch((err) => {
      console.log(err)
    });
  }

  static getSingleProduct(id){
    let db = getDb();
    console.log('product vlaue in models',id)
    
    return db.collection('product').find({_id:new mongodb.ObjectId(id)}).next().then((result) => {
      console.log('product vlaue in models',result)
       return result
    }).catch((err) => {
      
    });
  }

}











// 

module.exports = Product;

// const Product = sequelize.define('product', {
  //   id: {
  //     type: Sequelize.INTEGER,
  //     allowNull: false,
  //     autoIncrement: true,
  //     primaryKey: true
      
  //   },
  
  //   price: {
  //     allowNull: false,
  //     type: Sequelize.DOUBLE,
  //   },
  
  //   title: Sequelize.STRING,
  
  //   description: {
  //     allowNull: false,
  //     type: Sequelize.STRING,
  //   },
    
  //   imgUrl: {
  //     allowNull: false,
  //     type: Sequelize.STRING
  //   },
  // });




// save() {
//  return db.execute("insert into products(title,price,description,imgURl) values(?,?,?,?)",[this.title,this.price,this.description,this.imgUrl])
// }

// ***********************************************
// ***********************************************
// ***********************************************

//  FILE SYSTEM CRUD AND CART WORK IN PRODUCT MODEL

//  ***********************************************
// ***********************************************
// ***********************************************

// const fs = require("fs");
// const path = require("path");
// const rootDirectory = require("../utils/path");
// const p = path.join(rootDirectory, "Data", "product.json");
// const c = path.join(rootDirectory, "Data", "cart.json");

// const Cart = require("./cart");

// const getHelperMethod = () => {
//   return new Promise((resolve, reject) => {
//     fs.readFile(p, (error, fileData) => {
//       if (error) {
//         resolve([]);
//       } else {
//         resolve(JSON.parse(fileData));
//       }
//     });
//   });
// };

// module.exports = class product {
//   constructor(id, title, imgUrl, price, description) {
//     this.id = id;
//     this.title = title;
//     this.imgUrl = imgUrl;
//     this.price = price;
//     this.description = description;
//   }

//   save() {
//     getHelperMethod().then((products) => {
//       if (this.id) {
//         let existngProductIndex = products.findIndex((pro) => {
//           return pro.id === this.id;
//         });

//         products[existngProductIndex].title = this.title;
//         products[existngProductIndex].price = this.price;
//         products[existngProductIndex].description = this.description;
//         fs.writeFile(p, JSON.stringify(products), (err) => {});
//       } else {
//         this.id = Math.random().toString();
//         products.push(this);
//         fs.writeFile(p, JSON.stringify(products), (err) => {});
//       }
//     });
//   }

//   // Get All records
//   static getFetchAll() {
//     return new Promise((resolve, reject) => {
//       getHelperMethod().then((data) => {
//         resolve(data);
//       });
//     });
//   }

//   // Get single Record
//   static getSingleProduct(id) {
//     return new Promise((resolve, reject) => {
//       getHelperMethod().then((product) => {
//         let data = product.find((pro) => {
//           return pro.id === id;
//         });
//         resolve(data);
//       });
//     });
//   }

//   // Delete Product work
//   static deleteProduct(id) {
//     return new Promise((resolve, reject) => {
//       getHelperMethod().then((product) => {
//         let filterproduct = product.filter((pro) => pro.id !== id);
//         let productPrice = product.find((pro) => pro.id === id);
//         fs.writeFile(p, JSON.stringify(filterproduct), (err) => {
//           Cart.deleteCart(id, productPrice.price);
//           resolve(filterproduct);
//         });
//       });
//     });
//   }
// };
