


exports.get404 = (req,res,next)=>{
    // res.sendFile(path.join(rootDir,'views','error.html'))
    res.render('error',{pageTitle:'Error',path:'Error'})
  
  }
  