let fs = require("fs/promises");
let path = require("path");

async function delImg(imgName) {
    await fs.unlink(path.join("static", "images", imgName));
}

async function getImg(imgName) {
    let file = await fs.readFile(path.join("static", "images", imgName));
    let clearImage = file.toString("base64")
    return clearImage;
}

module.exports = {
    delImg,
    getImg
}