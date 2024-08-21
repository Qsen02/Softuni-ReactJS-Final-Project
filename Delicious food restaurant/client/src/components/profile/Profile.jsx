import { useUserContext } from "../../context/UserContext";

import { useGetUser } from "../../hooks/useAuth";

export default function Profile() {
    const { user } = useUserContext();
    const {curUser,setCurUserHandler,loading,setLoadingHandler,fetchFailed,setFetchFailedHandler}=useGetUser({orderHistory:[]},user._id)

    return (
        <>
            {user.isAdmin
                ? <>
                    <div>
                        <h2>Username: {curUser.username}</h2>
                        <h2>Email: {curUser.email}</h2>
                        <p>Created dishes count: {curUser.createdDishes?.length}</p>
                    </div>
                    <div>
                        <h2>Your created dishes</h2>
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