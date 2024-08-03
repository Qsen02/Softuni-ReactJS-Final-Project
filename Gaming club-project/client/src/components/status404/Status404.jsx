import styles from "./Status404.module.css"
import { Link } from "react-router-dom"

export default function Status404() {
    return (
        <div className={styles.errorWrapper}>
            <h1>Status 404</h1>
            <h1>Page not found!</h1>
            <p>Please return to <Link to="/">HOME</Link></p>
        </div>
    )
}