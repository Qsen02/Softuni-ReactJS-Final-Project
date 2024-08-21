import { useUserContext } from "../../context/UserContext";

import { useGetUser } from "../../hooks/useAuth";

import ProfleCreatedDishes from "./createdDishes/ProfileCreatedDishes";

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
                    <div>
                        <h2>Username: {curUser.username}</h2>
                        <h2>Email: {curUser.email}</h2>
                        <p>Created dishes count: {curUser.createdDishes?.length}</p>
                    </div>
                    <div>
                        <h2>Your created dishes</h2>
                        {curUser.createdDishes?.length == 0
                            ? <p>No created dishes yet</p>
                            : curUser.createdDishes?.map(el => <ProfleCreatedDishes key={el._id} id={el._id} image={el.image} title={el.title} price={el.price} />)
                        }
                        {curUser.createdDishes?.length == 0 && loading && !fetchFailed
                            ? <p>Created dishes loading...</p>
                            : ""
                        }
                        {!loading && fetchFailed
                            ? <p>Fetch failed please return to home</p>
                            : ""
                        }
                    </div>
                </>
                : <>
                    <div>
                        <h2>Username: {curUser.username}</h2>
                        <h2>Email: {curUser.email}</h2>
                        <p>Addess: {curUser.address}</p>
                        <p>Orders count: {curUser.orderHistory.length}</p>
                    </div>
                    <div>
                        <h2>Your orders</h2>
                    </div>
                </>
            }
        </>
    )
}