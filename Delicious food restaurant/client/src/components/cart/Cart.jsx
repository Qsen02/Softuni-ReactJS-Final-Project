import { useUserContext } from "../../context/UserContext";
import { useGetDishesFromCart } from "../../hooks/useCart"

export default function Cart() {
    const { user } = useUserContext();
    const { dishes, setDishesHandler,loading,setLoadingHandler,fetchFailed,setFetchFailedHandler } = useGetDishesFromCart([], user);

    return (
        <div>
            <h2>Cart</h2>
            <button>Order</button>
            <button>Cancel</button>
        </div>
    )
}