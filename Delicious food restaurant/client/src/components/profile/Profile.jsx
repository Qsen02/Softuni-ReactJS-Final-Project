import { useUserContext } from "../../context/UserContext";

import { useGetUser } from "../../hooks/useAuth";

import ProfleCreatedDishes from "./createdDishes/ProfileCreatedDishes";
import ProfileOrders from "./profileOrders/ProfileOrders";

import styles from "./Profile.module.css"
import { useProfilePagination } from "../../hooks/usePagination";

export default function Profile() {
    const { user } = useUserContext();
    const { curUser, loading, setLoadingHandler, fetchFailed, createdDishes, setCreatedDishesHandler, maxPage, allCreatedDishes } = useGetUser({ orderHistory: [] }, user._id);
    const { page, profilePaginationHandler } = useProfilePagination(maxPage, setCreatedDishesHandler, setLoadingHandler, allCreatedDishes);

    function nextPage() {
        profilePaginationHandler(page + 1);
    }

    function previousPage() {
        profilePaginationHandler(page - 1);
    }

    function lastPage() {
        profilePaginationHandler(maxPage - 1);
    }

    function firstPage() {
        profilePaginationHandler(0);
    }

    return (
        <>
            {loading && !fetchFailed
                ? <div className={styles.loadingSpinner}></div>
                : ""
            }
            {user.isAdmin
                ? <>
                    {!fetchFailed
                        ? <>
                            <div className={styles.adminHeader}>
                                <i className="fa-solid fa-circle-user"></i>
                                <h2>Username: {curUser.username}</h2>
                                <h2>Email: {curUser.email}</h2>
                                <p>Created dishes count: {curUser.createdDishes?.length}</p>
                            </div>
                            :<>
                                <h1 className={styles.title}>Your created dishes</h1>
                                <div className={styles.adminBody}>
                                    {curUser.createdDishes?.length == 0 && !loading
                                        ? <h2 className={styles.message}>No created dishes yet</h2>
                                        : createdDishes?.map(el => <ProfleCreatedDishes key={el._id} id={el._id} image={el.image} title={el.title} price={el.price} />)
                                    }
                                    {loading && !fetchFailed
                                        ? <h2 className={styles.message}>Created dishes loading...</h2>
                                        : ""
                                    }
                                </div>
                                {!loading && !fetchFailed
                                    ? <div className={styles.pagination}>
                                        <i onClick={firstPage} className="fa-solid fa-angles-left"></i>
                                        <i onClick={previousPage} className={`fa-solid fa-chevron-left ${page + 1 == 1 || maxPage == 1 ? styles.invisible : ""}`}></i>
                                        <p>{page + 1} of {maxPage}</p>
                                        <i onClick={nextPage} className={`fa-solid fa-chevron-right ${page + 1 == maxPage || maxPage == 1 ? styles.invisible : ""}`}></i>
                                        <i onClick={lastPage} className="fa-solid fa-angles-right"></i>
                                    </div>
                                    : ""
                                }
                            </>
                        </>
                        : <h2 className={styles.message}>Fetch failed please return to catalog.</h2>
                    }
                </>
                : <>
                    {!fetchFailed
                        ? <>
                            <div className={styles.adminHeader}>
                                <i className="fa-solid fa-circle-user"></i>
                                <h2>Username: {curUser.username}</h2>
                                <h2>Email: {curUser.email}</h2>
                                <p>Addess: {curUser.address}</p>
                                <p>Orders count: {curUser.orderHistory.length}</p>
                            </div>
                            <div className={styles.userBody}>
                                <h2>Your orders</h2>
                                {curUser.orderHistory.length == 0 && !loading
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