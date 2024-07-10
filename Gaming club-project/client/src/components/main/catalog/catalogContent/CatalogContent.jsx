import styles from "./CatalogContent.module.css"

export default function CatalogContent({
    id,
    category,
    image,
    name
}) {
    return (
        <div className={styles.catalogContent}>
            <img src={image} alt={name} />
            <h1>{name}</h1>
            <h3>Category: {category}</h3>
            <a href={`/catalog/${id}`}><button>Details</button></a>
        </div>
    )
}