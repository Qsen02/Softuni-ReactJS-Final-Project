import { useNavigate, useParams } from "react-router-dom";

import DishLikesContent from "./dishLikesContent/DishLikesContent";

import { useGetOneDish } from "../../hooks/useDishes";

import styles from "./DishLikes.module.css"

export default function DishLikes() {
    const {dishId}=useParams();
    const navigate=useNavigate();
    const {dish}=useGetOneDish({likes:[]},dishId);

    function onBack(){
        navigate(`/catalog/${dishId}`);
    }

    return (
        <div className={styles.modal}>
            <div className={styles.wrapper}>
                <h2>Users list</h2>
                {dish.likes.map(el=><DishLikesContent key={el._id} username={el.username}/>)}
                <button onClick={onBack}>Back</button>
            </div>
        </div>
    )
}