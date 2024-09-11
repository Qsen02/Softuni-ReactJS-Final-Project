import { Link } from "react-router-dom";

import styles from "./Status404.module.css"

export default function Status404(){
    return(
        <section className={styles.wrapper}>
            <h2>Page not found!</h2>
            <p>Please return to <Link to="/">HOME</Link>.</p>
        </section>
    )
}