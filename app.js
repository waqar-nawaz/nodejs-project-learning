require('dotenv').config()
const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const adminrHandler = require("./routes/admin");
const shopHandler = require("./routes/shop");
const auth = require("./routes/auth");
const errorController = require("./controllers/errorController");
const mongoose = require('mongoose')
const User = require('./models/user')

const session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);




app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", "views");

var store = new MongoDBStore({
  uri: process.env.MONGO_URL,
  collection: 'Sessions'
});

app.use(
  session({ secret: 'my secret', resave: false, saveUninitialized: false, store: store })
);

app.use((req, res, next) => {

  if (!req.session.user) {
    return next()
  }
  User.findById(req.session.user._id)
    .then((user) => {

      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });

});


app.use((req, res, next) => {
  res.locals.khan = 'yes it passed'
  next();
})


app.use("/admin", adminrHandler);
app.use(shopHandler);
app.use(auth);
app.use(errorController.get404);


mongoose.connect(process.env.MONGO_URL).then((result) => {
  console.log(`WORKING PORT IS http://localhost:${4200 || process.env.PORT}`);
  app.listen(4200 || process.env.PORT)

}).catch((err) => {

  console.log(err);

});































// Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
// User.hasMany(Product);
// Cart.belongsTo(User);
// User.hasOne(Cart);

// Cart.belongsToMany(Product, { through: CartItem }); // in one cart may be many product
// Product.belongsToMany(Cart, { through: CartItem }); // same prodcut may be in different cart by different user

// Order.belongsTo(User);
// User.hasMany(Order);

// Order.belongsToMany(Product, { through: OrderItem });

// sequelize
//   .sync({ force: true })
//   // .sync()
//   .then((result) => {
//     User.findByPk(1)
//       .then((user) => {
//         if (!user) {
//           return User.create({ name: "waqar", email: "waqar@gmail.com" });
//         }

//         return user;
//       })
//       .then((user) => {
//         return user.getCart().then((result) => {
//           if (result == null) {
//             return user.createCart();
//           }
//         });
//       })
//       .then((cart) => {
//         app.listen(3000);
//       })
//       .catch((err) => { });
//   })
//   .catch((err) => {
//     console.log("err :>> ", err);
//   });
