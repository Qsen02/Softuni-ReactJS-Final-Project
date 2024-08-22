import { useParams } from "react-router-dom"

import OrderDetailsDish from "./orderDetailsDish/OrderDetailsDish";

import { useGetDishesFromOrder } from "../../hooks/useDishes";

export default function OrderDetails() {
    const { orderId } = useParams();
    const { dishes, loading, fetchFailed ,totalPrice} = useGetDishesFromOrder([], orderId);

    return (
        <>
            {loading && !fetchFailed
                ? <div></div>
                : ""
            }
            <div>
                <h2>Price: {totalPrice}$</h2>
                {!fetchFailed
                    ? dishes.map(el => <OrderDetailsDish key={el._id} image={el.image} title={el.title} price={el.price} />)
                    : <h2>Fetch failed please return ro profile.</h2>
                }
                <button>Back</button>
            </div>
        </>
    )
}