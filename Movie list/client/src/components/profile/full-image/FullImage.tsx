import { useNavigate } from "react-router-dom";
import styles from "./FullImage.module.css"

type FullImageType = {
    image: string,
    username: string
}

export default function FullImage({
    image, username
}: FullImageType) {
    const navigate=useNavigate();

    function onBack(){
        navigate("/profile");
    }

    return (
        <div className={styles.modal} onClick={onBack}>
            <img src={image} alt={username} />
        </div>
    )
}