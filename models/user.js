

const mongoose = require('mongoose');

const Schema = mongoose.Schema


const userSchema = Schema({
  email: {
    type: String,
    require: true
  }
  ,
  name: {
    type: String,
    require: true
  }
  ,
  cart: {
    items: [{
      productId: { type: Schema.Types.ObjectId, require: true, ref: 'User' }
      , quantity: { type: Number, require: true }
    }]
  }
});


userSchema.methods.addtoCart = function (product) {
  const proIndex = this.cart.items.findIndex((pro) => {
    console.log(product._id, pro.productId);
    return product._id.toString() === pro.productId.toString()
  })

  console.log('pro index', proIndex);

  let updatedCartItem = [...this.cart.items]

  if (proIndex >= 0) {

    updatedCartItem[proIndex].quantity = this.cart.items[proIndex].quantity + 1
  }

  else {
    updatedCartItem.push({ productId: product._id, quantity: 1 })
  }

  let updatecart = {
    items: updatedCartItem
  }

  this.cart = updatecart

  return this.save();

}



module.exports = mongoose.model('User', userSchema)






// const getdb = require('../utils/database').getDb
// const mongodb = require('mongodb');

// class User {
//   constructor(email, name) {
//     this.name = name
//     this.email = email
//   }



//   static findById(id) {

//     let db = getdb();

//     return db.collection('users').findOne({ _id: new mongodb.ObjectId(id) });
//   }
// }


// module.exports = User;