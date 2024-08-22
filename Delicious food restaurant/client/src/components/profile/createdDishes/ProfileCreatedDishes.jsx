import { Link } from "react-router-dom"

import { errorHandler } from "../../../utils/imageErrorHandler"

export default function ProfleCreatedDishes({
    id, image, title, price
}) {

    return (
        <div>
            <img src={image} alt={title} onError={errorHandler} />
            <h3>{title}</h3>
            <p>Price: {price}</p>
            <Link to={`/catalog/${id}`}><button>Details</button></Link>
        </div>
    )
}