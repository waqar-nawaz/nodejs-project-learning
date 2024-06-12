
const getdb = require('../utils/database').getDb
const mongodb = require('mongodb');

class User {
  constructor(email, name) {
    this.name = name
    this.email = email
  }



  static findById(id) {

    let db = getdb();

    return db.collection('users').findOne({ _id: new mongodb.ObjectId(id) });
  }
}


module.exports = User;