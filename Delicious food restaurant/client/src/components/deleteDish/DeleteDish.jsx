import { useNavigate, useParams } from "react-router-dom"
import styles from "./DeleteDish.module.css"
import { useDeleteDish } from "../../hooks/useDishes";
import { useUserContext } from "../../context/UserContext";

export default function DeleteDish({
    dish
}) {
    const { dishId } = useParams();
    const navigate = useNavigate();
    const deleteDish = useDeleteDish();
    const {clearUserHandler}=useUserContext();

    async function onDelete() {
        try{
        await deleteDish(dishId);
        navigate("/catalog");
        }catch(err){
            if (err.message == "You don't have credentials, please login or register!") {
                clearUserHandler();
                return;
            }
            return;
        }
    }

    async function onCancel(){
        navigate(`/catalog/${dishId}`);
    }

    return (
        <div className={styles.modal}>
            <div className={styles.deleteWrapper}>
                <h2>Are you sure you want to delete {dish.title}?</h2>
                <button onClick={onDelete}>Yes</button>
                <button onClick={onCancel}>No</button>
            </div>
        </div>
    )
}