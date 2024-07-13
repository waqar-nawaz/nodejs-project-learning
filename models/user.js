

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