import styles from "./CatalogContent.module.css"

export default function CatalogContent() {
    return (
        <div className={styles.catalogContent}>
            <img src="asdasd" alt="asdasd" />
            <h1>fdgdfhgdfh</h1>
            <h3>Category: fghfghjfghj</h3>
            <a href="/games/details/{{_id}}"><button>Details</button></a>
        </div>
    )
}