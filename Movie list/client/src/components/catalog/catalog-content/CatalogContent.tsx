import { Link } from "react-router-dom"

type CatalogContentProps = {
    id: string,
    title: string,
    genre: string,
    image: string
}

export default function CatalogContent({
    id, title, genre, image
}: CatalogContentProps) {
    return (
        <div>
            <img src={image} alt={title} />
            <h2>{title}</h2>
            <p>Genre: {genre}</p>
            <Link to={`/catalog/${id}`}><button>Details</button></Link>
        </div>
    )
}