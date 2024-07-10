let host = "http://localhost:3000/images";
export async function getImage(imageName) {
    try {
        let response = await fetch(`${host}/${imageName}`);
        if (!response.ok) {
            throw new Error("Image not found!");
        }
        let imageBase64 = await response.json();
        let image = `data:image/jpeg;base64,${imageBase64.imgFile}`
        return image;
    } catch (err) {
        alert(err.message);
        return;
    }
}