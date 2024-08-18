import { useParams } from "react-router-dom";
import { useGetOneDish } from "../../hooks/useDishes";

import DetailsButtons from "./details-buttons/DetailsButtons";

import styles from "./Details.module.css"

import { useUserContext } from "../../context/UserContext";

export default function Details() {
    const initialvalues = {
        likes: []
    }
    const { dishId } = useParams();
    const { user } = useUserContext();
    const { dish, setDishHandler, owner, isLoading, isFetchFailed } = useGetOneDish(initialvalues, dishId);

    return (
        <>
            {isLoading && !isFetchFailed? <div className={styles.loadingSpinner}></div> : ""}
            {isFetchFailed
                ? <h1 className={styles.message}>Fetch failed please return to catalog.</h1>
                : <div className={styles.wrapper}>
                    <div className={styles.detailsHeader}>
                        <img src={dish.image} alt={dish.title} />
                        <div>
                            <h2>{dish.title}</h2>
                            <p>Category: {dish.category}</p>
                            <DetailsButtons />
                        </div>
                    </div>
                    <div className={styles.detailsBody}>
                        <p>{dish.description}</p>
                    </div>
                </div>
            }
        </>
    )
}