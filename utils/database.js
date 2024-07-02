
const mongodb = require('mongodb');

const mongoClient = mongodb.MongoClient;
require('dotenv').config()



let _db;

const link = process.env.MONGO_URL

const mongonConnection = (callback) => {

  mongoClient.connect(link).then((client) => {

    console.log('Connected!')
    _db = client.db();
    callback()

  }).catch((err) => {
    console.log(err);
  })
}

const getDb = () => {

  if (_db) {
    return _db
  }
  throw 'Database Not Found'
}

exports.mongonConnection = mongonConnection
exports.getDb = getDb


















// const mysql = require('mysql2')

// const pool = mysql.createPool({
//     host:'localhost',
//     user: 'root',
//     database:'nodejs-tutorial',
//     password:'noderoot'
// })

// module.exports= pool.promise();





// const Sequelize = require("sequelize");

// const sequelize = new Sequelize("nodejs-tutorial", "root", "noderoot", {
//   dialect: "mysql",
//   host: "localhost",
// });

// module.exports = sequelize;