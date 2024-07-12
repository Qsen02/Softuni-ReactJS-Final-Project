import { useState } from "react"
import styles from "./Home.module.css"
import { useEffect } from "react";
import { getImage } from "../../api/imageService";

export default function Home() {
    let imageName = "gaming-banner-for-games-with-glitch-effect-neon-light-on-text-illustration-design-free-vector.jpg";
    let [image, setImage] = useState(null);
    useEffect(() => {
        (async function getImageHandler() {
            let image = await getImage(imageName);
            setImage(image)
        })()
    }, [])

    return (
        <div className={styles.home}>
            <h1>Welcome to gaming club!</h1>
            <img src={image} alt="gaming image" />
            <p>Here you can found most different and varied games!</p>
        </div>
    )
}