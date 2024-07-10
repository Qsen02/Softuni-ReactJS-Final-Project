const { Router } = require("express");
const { getImg } = require("../services/image");

let imageRouter = Router();

imageRouter.get("/:imageName", async(req, res) => {
    let image = req.params.imageName;
    let imgFile = await getImg(image);
    res.json({ imgFile });
})

module.exports = {
    imageRouter
}