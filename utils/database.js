
const mongodb = require('mongodb');

const mongoClient = mongodb.MongoClient;





const link = 'mongodb+srv://nodejscource:buUQrtLiN3fkmpcV@nodejscource.seucex9.mongodb.net/?retryWrites=true&w=majority&appName=nodejscource'

const mongonConnection = (callback) => {

  mongoClient.connect(link).then((connection) => {

    console.log('Connected!')
    callback(connection)

  }).catch((err) => {

  })
}


module.exports = mongonConnection


















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