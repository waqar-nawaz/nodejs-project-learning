const path = require("path");

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const adminrHandler = require("./routes/admin");
const shopHandler = require("./routes/shop");
const sequelize = require("./utils/database");
const User = require("./models/user");
const Product = require("./models/productModel");

const errorController = require("./controllers/errorController");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", "views");

app.use((req,res,next)=>{
  User.findByPk(1).then((user) => {
    req.user = user;

    // console.log('req.user :>> ', req.user);
    next();
    
  }).catch((err) => {
    
  });
})
app.use("/admin", adminrHandler);
app.use(shopHandler);
app.use(errorController.get404);


Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product)
sequelize
  .sync()
  .then((result) => {
    User.findByPk(1)
      .then((user) => {
        if (!user) {
          return User.create({ name: "waqar", email: "waqar@gmail.com" });
        }

        return user;
      })
      .then((user) => {
        // console.log("user :>> ", user);
      })
      .catch((err) => {

      });
  })
  .catch((err) => {
    console.log("err :>> ", err);
  });

app.listen(3000);

// const server = http.createServer(routeHander);
