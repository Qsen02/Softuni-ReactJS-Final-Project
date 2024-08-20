import { useNavigate } from "react-router-dom";

import { useUserContext } from "../../context/UserContext";
import { useGetDishesFromCart } from "../../hooks/useCart"

import styles from "./cart.module.css"

import CartContent from "./cartContent/CartContent";

export default function Cart() {
    const { user } = useUserContext();
    const navigate = useNavigate();
    const { dishes, setDishesHandler, loading, setLoadingHandler, fetchFailed, setFetchFailedHandler } = useGetDishesFromCart([], user);

    return (
        <>
            {loading && !fetchFailed
                ? <div className={styles.loadingSpinner}></div>
                : ""
            }
            <div className={styles.cartWrapper}>
                <h1>Cart</h1>
                {dishes.length == 0 && !loading && !fetchFailed
                    ? <h2 className={styles.message}>No dishes in cart yet</h2>
                    : dishes.map(el => <CartContent key={el._id} id={el._id} title={el.title} price={el.price} image={el.image} />)
                }
                {!fetchFailed && loading
                    ? <h2 className={styles.message}>Dishes loading...</h2>
                    : ""
                }
                {fetchFailed
                    ? <h2 className={styles.message}>Fetch failed please return to catalog.</h2>
                    : ""
                }
                    <button className={styles.buttons}>Order</button>
                    <button className={styles.buttons}>Cancel</button>
            </div>
        </>
    )
}