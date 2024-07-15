import styles from "./Status404.module.css"
export default function Status404() {
    return (
        <div className={styles.errorWrapper}>
            <h1>Status 404</h1>
            <h1>Page not found!</h1>
            <p>Please return to <a href="/">HOME</a></p>
        </div>
    )
}