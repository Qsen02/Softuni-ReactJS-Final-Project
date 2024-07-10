import styles from "./CatalogSearch.module.css"

export default function CatalogSearch() {
    return (
        <form method="GET" className={styles.search}>
            <input name="name" type="text" placeholder="Enter game name..." />
            <button type="submit">Search</button>
        </form>
    )
}