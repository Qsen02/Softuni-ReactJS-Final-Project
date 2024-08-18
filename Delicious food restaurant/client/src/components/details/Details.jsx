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
    const { dish, setDishHandler, owner, isLoading } = useGetOneDish(initialvalues, dishId);

    return (
        <div className={styles.wrapper}>
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
    )
}