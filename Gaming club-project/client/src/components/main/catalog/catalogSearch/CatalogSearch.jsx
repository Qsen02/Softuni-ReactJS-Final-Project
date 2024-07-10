import styles from "./CatalogSearch.module.css"

export default function CatalogSearch({
    onSearch
}) {
    return (
        <form onSubmit={onSearch} className={styles.search}>
            <input name="name" type="text" placeholder="Enter game name..." />
            <button type="submit">Search</button>
        </form>
    )
}