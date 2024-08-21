import { Link } from "react-router-dom"

export default function ProfleCreatedDishes({
    id, image, title, price
}) {

    function setImage(event) {
        event.target.src = "/assets/restaurant-logo,restaurant-icon-logo-free-design-template-e4e92c7d3b5631a777fce7a5d629a00a_screen.jpg"
    }

    return (
        <div>
            <img src={image} alt={title} onError={setImage} />
            <h3>{title}</h3>
            <p>Price: {price}</p>
            <Link to={`/catalog/${id}`}><button>Details</button></Link>
        </div>
    )
}