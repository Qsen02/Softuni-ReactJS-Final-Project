import { Link } from "react-router-dom";

export default function CatalogContent({
    id,
    title,
    price,
    image
}) {
    return (
        <div>
            <img src={image} alt={title} />
            <h3>{title}</h3>
            <p>{price}$</p>
            <Link to={`/catalog/${id}`}><button >Details</button></Link>
        </div>
    )
}