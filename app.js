const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const adminrHandler = require("./routes/admin");
const shopHandler = require("./routes/shop");
// const User = require("./models/user");
const errorController = require("./controllers/errorController");

const mongodb = require('./utils/database').mongonConnection


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", "views");

app.use((req, res, next) => {
  // User.findByPk(1)
  //   .then((user) => {
  //     req.user = user;

  //     // console.log('req.user :>> ', req.user);
  //     next();
  //   })
  //   .catch((err) => { });
  next()
});
app.use("/admin", adminrHandler);
app.use(shopHandler);
app.use(errorController.get404);

mongodb(() => {
  console.log('port 3000 working');
  app.listen(3000)
})





// with promises call
// mongodb().then((client) => {
//   console.log(client)
//   app.listen(3000)
// }).catch((err) => {

// });





// const server = http.createServer(routeHander);























































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
