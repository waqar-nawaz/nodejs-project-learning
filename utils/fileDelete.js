

const fs = require('fs')
const path = require('path')


const deleteImage = (filepath) => {
    fs.unlink(filepath, (err) => {
        if (err) return new Error("file have Error")
    })
}


module.exports = deleteImage;  //export the function to use in other files