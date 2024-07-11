import styles from "./CatalogContent.module.css"

export default function CatalogContent({
    id,
    category,
    image,
    name,
    year,
}) {
    return (
        <div className={styles.catalogContent}>
            <img src={image} alt={name} />
            <h1>{name}</h1>
            <h3>Category: {category}</h3>
            <h3>Year: {year}</h3>
            <a href={`/catalog/${id}`}><button>Details</button></a>
        </div>
    )
}