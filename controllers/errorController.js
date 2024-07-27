exports.get404 = (req, res, next) => {
  // res.sendFile(path.join(rootDir,'views','error.html'))
  res.status(404).render("error", {
    pageTitle: "Error",
    path: "Error",
    isauthntivated: req.session.islogin,
  });
};
exports.get500 = (req, res, next) => {
  // res.sendFile(path.join(rootDir,'views','error.html'))
  res.render("500", {
    pageTitle: "500",
    path: "/500",
    isauthntivated: req.session.islogin,
  });
};
