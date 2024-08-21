import { useUserContext } from "../../context/UserContext";

import { useGetUser } from "../../hooks/useAuth";

import ProfleCreatedDishes from "./createdDishes/ProfileCreatedDishes";
import ProfileOrders from "./profileOrders/ProfileOrders";

export default function Profile() {
    const { user } = useUserContext();
    const { curUser, setCurUserHandler, loading, setLoadingHandler, fetchFailed, setFetchFailedHandler } = useGetUser({ orderHistory: [] }, user._id)

    return (
        <>
            {loading && !fetchFailed
                ? <div></div>
                : ""
            }
            {user.isAdmin
                ? <>
                    {!fetchFailed
                        ? <>
                            <div>
                                <h2>Username: {curUser.username}</h2>
                                <h2>Email: {curUser.email}</h2>
                                <p>Created dishes count: {curUser.createdDishes?.length}</p>
                            </div>
                            :<div>
                                <h2>Your created dishes</h2>
                                {curUser.createdDishes?.length == 0
                                    ? <h2>No created dishes yet</h2>
                                    : curUser.createdDishes?.map(el => <ProfleCreatedDishes key={el._id} id={el._id} image={el.image} title={el.title} price={el.price} />)
                                }
                                {loading && !fetchFailed
                                    ? <h2>Created dishes loading...</h2>
                                    : ""
                                }
                            </div>
                        </>
                        : <h2>Fetch failed please return to catalog.</h2>
                    }
                </>
                : <>
                    {!fetchFailed
                        ? <>
                            <div>
                                <h2>Username: {curUser.username}</h2>
                                <h2>Email: {curUser.email}</h2>
                                <p>Addess: {curUser.address}</p>
                                <p>Orders count: {curUser.orderHistory.length}</p>
                            </div>
                            <div>
                                <h2>Your orders</h2>
                                {curUser.orderHistory.length == 0
                                    ? <h2>No orders yet</h2>
                                    : curUser.orderHistory.map(el => <ProfileOrders key={el._id} id={el._id} totalPrice={el.totalPrice} dishes={el.dishes} />)
                                }
                                {loading && !fetchFailed
                                    ? <h2>Orders loading...</h2>
                                    : ""
                                }
                            </div>
                        </>
                        : <h2>Fetch failed please return to catalog.</h2>
                    }
                </>
            }
        </>
    )
}