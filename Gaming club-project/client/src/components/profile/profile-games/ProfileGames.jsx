import { Link } from "react-router-dom"

import styles from "../Profile.module.css"

export default function ProfileGames({
    id,name,category,image
}) {
    return (
        <div className={styles.profileDivContent}>
            <img src={image} alt={name} />
            <h1>{name}</h1>
            <h3>Category: {category}</h3>
            <Link to={`/catalog/${id}`}><button>Details</button></Link>
        </div>
    )
}