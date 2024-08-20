import { Link } from "react-router-dom";

export default function CartContent({
    id, title, price, image
}) {
    return (
        <div>
            <img src={image} alt={title} />
            <p>{title}</p>
            <p>Price: {price}$</p>
            <button>Remove</button>
            <Link to={`/catalog/${id}`}><button>Details</button></Link>
        </div>
    )
}