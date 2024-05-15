const Sequelize = require("sequelize");

const sequelize = new Sequelize("nodejs-tutorial", "root", "noderoot", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;









// const mysql = require('mysql2')

// const pool = mysql.createPool({
//     host:'localhost',
//     user: 'root',
//     database:'nodejs-tutorial',
//     password:'noderoot'
// })

// module.exports= pool.promise();

