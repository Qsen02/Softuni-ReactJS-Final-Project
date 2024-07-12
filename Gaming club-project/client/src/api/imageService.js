import {get } from "./api";

let endpoint = "/images";

export async function getImage(imageName) {
    let imageBase64 = await get(`${endpoint}/${imageName}`);
    let image = `data:image/jpeg;base64,${imageBase64.imgFile}`
    return image;
}