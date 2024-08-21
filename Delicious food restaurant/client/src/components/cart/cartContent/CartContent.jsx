import { Link } from "react-router-dom";
import { useRemoveDishFromCart } from "../../../hooks/useCart";

export default function CartContent({
    setDishes, setFetchFailed, cart, id, title, price, image
}) {
    const removeDishFromCart = useRemoveDishFromCart();

    async function onRemove() {
        try {
            const dishes = await removeDishFromCart(id, cart._id);
            setDishes(dishes);
        } catch (err) {
            if (err.message == "Resource not found!") {
                navigate("/404");
            }
            setFetchFailed(true);
            return;
        }
    }

    return (
        <div>
            <img src={image} alt={title} />
            <p>{title}</p>
            <p>Price: {price}$</p>
            <button onClick={onRemove}>Remove</button>
            <Link to={`/catalog/${id}`}><button>Details</button></Link>
        </div>
    )
}