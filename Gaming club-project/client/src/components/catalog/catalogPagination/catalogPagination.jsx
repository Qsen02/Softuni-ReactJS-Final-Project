import styles from "../Catalog.module.css"

export default function CatalogPagination({
    nextPage,
    previousPage,
    finalPage,
    firstPage,
    page,
    maxPage
}) {
    return (
        <div className={styles.paginationButtons}>
            <button onClick={firstPage}>&lt;&lt;</button>
            <button onClick={previousPage} style={page + 1 == 1 ? { visibility: "hidden" } : { visibility: "visible" }}>&lt;</button>
            <p>{page + 1} of {maxPage}</p>
            <button onClick={nextPage} style={page + 1 == maxPage ? { visibility: "hidden" } : { visibility: "visible" }}>&gt;</button>
            <button onClick={finalPage}>&gt;&gt;</button>
        </div>
    )
}