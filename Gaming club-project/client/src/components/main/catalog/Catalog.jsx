import styles from "./Catalog.module.css"
import CatalogSearch from "./catalogSearch/CatalogSearch"
import CatalogContent from "./catalogContent/CatalogContent"

export default function Catalog() {
    return (
        <>
            <h1>Search for games here</h1>
            <CatalogSearch />
            <h1>No games yet</h1>
            <h1>All available games</h1>
            <div className={styles.catalogWrapper}>
                <CatalogContent />
            </div>
        </>
    )
}