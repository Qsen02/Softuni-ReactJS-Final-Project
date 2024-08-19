import { Route, Routes, useParams } from "react-router-dom";

import { useGetOneDish } from "../../hooks/useDishes";

import DetailsButtons from "./details-buttons/DetailsButtons";
import DeleteDish from "../deleteDish/DeleteDish";

import styles from "./Details.module.css"

import { useUserContext } from "../../context/UserContext";
import { errorHandler } from "../../utils/imageErrorHandler";
import EditDish from "../editDish/EditDish";

export default function Details() {
    const initialvalues = {
        likes: []
    }
    const { dishId } = useParams();
    const { user } = useUserContext();
    const { dish, setDishHandler, isLoading, isFetchFailed, setIsFetchFailed } = useGetOneDish(initialvalues, dishId);

    return (
        <>
            <Routes>
                <Route path="/delete" element={<DeleteDish dish={dish} />} />
                <Route path="/edit" element={<EditDish setDish={setDishHandler}/>}/>
            </Routes>
            {isLoading && !isFetchFailed ? <div className={styles.loadingSpinner}></div> : ""}
            {isFetchFailed
                ? <h1 className={styles.message}>Fetch failed please return to catalog.</h1>
                : <div className={styles.wrapper}>
                    <div className={styles.detailsHeader}>
                        <img src={dish.image} alt={dish.title} onError={errorHandler}/>
                        <div>
                            <h2>{dish.title}</h2>
                            <p>Category: {dish.category}</p>
                            <p>Price: {dish.price}$</p>
                            <DetailsButtons setFailed={setIsFetchFailed} id={dishId} curUser={user} setDish={setDishHandler} likes={dish.likes} likesCount={dish.likes.length} />
                        </div>
                    </div>
                    <div className={styles.detailsBody}>
                        <p>{dish.description}</p>
                    </div>
                </div >
            }
        </>
    )
}