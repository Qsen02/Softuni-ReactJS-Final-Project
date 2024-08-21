import { Link } from "react-router-dom";

export default function ProfileOrders({
    id, totalPrice,dishes
}) {
    return (
        <div>
            <h2>Order</h2>
            <p>Total price: {totalPrice}</p>
            <Link to={`/profile/order/${id}`}><button>Details</button></Link>
        </div>
    )
}