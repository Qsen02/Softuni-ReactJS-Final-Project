import { Link } from "react-router-dom";

export default function ProfileOrders({
    id, totalPrice
}) {
    return (
        <div>
            <h3>Order</h3>
            <p>Total price: {totalPrice}$</p>
            <Link to={`/profile/order/${id}`}><button>Details</button></Link>
        </div>
    )
}