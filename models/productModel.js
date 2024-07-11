

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({

  title: {
    type: String,
    require: true
  },
  price: {
    type: Number,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  imgUrl: {
    type: String,
    require: true
  },

})


module.exports = mongoose.model('Product', productSchema)



















// const getDb = require('../utils/database').getDb
// const mongodb = require('mongodb');


// class Product {
//   constructor(title, price, description, imgUrl, id, userid) {
//     this.title = title
//     this.price = price
//     this.description = description
//     this.imgUrl = imgUrl
//     this.userid = userid
//   }


//   save() {
//     let db = getDb();
//     return db.collection('product').insertOne(this).then((product) => {
//       console.log('productssssss', product);
//     }).catch((err) => {
//       console.log(err);
//     });
//   }

//   static fetchAll() {
//     let db = getDb()
//     return db.collection('product').find().toArray().then((product) => {
//       return product
//     }).catch((err) => {
//       console.log(err)
//     });
//   }

//   static getSingleProduct(id) {
//     let db = getDb();
//     console.log('product vlaue in models', id)

//     return db.collection('product').find({ _id: new mongodb.ObjectId(id) }).next().then((result) => {
//       console.log('product vlaue in models', result)
//       return result
//     }).catch((err) => {

//     });
//   }


//   static updateProduct(id, data) {
//     let db = getDb();
//     return db.collection('product').updateOne({ _id: new mongodb.ObjectId(id) }, { $set: data }).then((product) => {
//       console.log('update in model', product);
//       return product
//     }).catch((err) => {

//     });
//   }


//   static deleteProduct(id) {
//     let db = getDb();
//     return db.collection('product').deleteOne({ _id: new mongodb.ObjectId(id) }).then((product) => {
//       console.log('Delete in model', product);
//       return product
//     }).catch((err) => {

//     });
//   }

// }











// // 

// module.exports = Product;




