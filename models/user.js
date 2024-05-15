
const { DataTypes} = require('sequelize')

const sequelize = require('../utils/database')


const User = sequelize.define('User',{

    id:{
     type:   DataTypes.INTEGER,
     allowNull : false,
     autoIncrement: true,
     primaryKey: true

    }
  ,
   name:DataTypes.STRING,
   email:DataTypes.STRING,

})

module.exports = User