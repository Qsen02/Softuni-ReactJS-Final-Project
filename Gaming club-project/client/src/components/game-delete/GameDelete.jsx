import { useNavigate, useParams } from "react-router-dom"
import styles from "./GameDelete.module.css"
import { deleteGame } from "../../api/gameService";

export default function GameDelete() {
    const { gameId } = useParams();
    const navigate = useNavigate();

    async function onDelete() {
        await deleteGame(gameId);
        navigate("/catalog");
    }

    function onCancel(){
        navigate(`/catalog/${gameId}`);
    }

    return (
        <div className={styles.modal}>
            <div className={styles.deleteWrapper}>
                <h1>Are you sure?</h1>
                <button onClick={onDelete}>Yes</button>
                <button onClick={onCancel}>No</button>
            </div>
        </div>

    )
}