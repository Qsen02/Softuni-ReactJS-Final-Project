import { useNavigate, useParams } from "react-router-dom"

import OrderDetailsDish from "./orderDetailsDish/OrderDetailsDish";

import { useGetDishesFromOrder } from "../../hooks/useDishes";

import styles from "./OrderDetails.module.css"

export default function OrderDetails() {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const { dishes, loading, fetchFailed, totalPrice } = useGetDishesFromOrder([], orderId);

    function onBack() {
        navigate("/profile");
    }

    return (
        <>
            {loading && !fetchFailed
                ? <div className={styles.loadingSpinner}></div>
                : ""
            }
            <div className={styles.wrapper}>
                <h2>Price: {totalPrice}$</h2>
                {!fetchFailed
                    ? dishes.map(el => <OrderDetailsDish key={el._id} image={el.image} title={el.title} price={el.price} />)
                    : <h2>Fetch failed please return ro profile.</h2>
                }
                <button onClick={onBack}>Back</button>
            </div>
        </>
    )
}