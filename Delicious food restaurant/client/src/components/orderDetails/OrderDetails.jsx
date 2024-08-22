import { useParams } from "react-router-dom"

export default function OrderDetails() {
    const { orderId } = useParams();
    const { dishes,loading,fetchFailed } = useGetDishesFromOrder([],orderId);

    return (
        <div>
            <h2>Price: 313$</h2>
            <button>Back</button>
        </div>
    )
}