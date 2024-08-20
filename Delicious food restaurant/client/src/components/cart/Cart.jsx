import { useUserContext } from "../../context/UserContext";
import { useGetDishesFromCart } from "../../hooks/useCart"

import CartContent from "./cartContent/CartContent";

export default function Cart() {
    const { user } = useUserContext();
    const { dishes, setDishesHandler, loading, setLoadingHandler, fetchFailed, setFetchFailedHandler } = useGetDishesFromCart([], user);

    return (
        <>
            {loading && !fetchFailed
                ? <div></div>
                : ""
            }
            <div>
                <h2>Cart</h2>
                {dishes.length == 0 && !loading
                    ? <h2>No dishes in cart yet</h2>
                    : dishes.map(el => <CartContent key={el._id} id={el._id} title={el.title} price={el.price} image={el.image} />)
                }
                {dishes.length == 0 && loading
                    ? <h2>Dishes loading...</h2>
                    : dishes.lenght && fetchFailed
                        ? <h2>Fetch faile please return to catalog.</h2>
                        : ""
                }
                <button>Order</button>
                <button>Cancel</button>
            </div>
        </>
    )
}