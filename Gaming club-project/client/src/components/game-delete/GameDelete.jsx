import { useNavigate, useParams } from "react-router-dom"

import styles from "./GameDelete.module.css"
import { useDeleteGame, useGetOneGame } from "../../hooks/useGames.js";

export default function GameDelete({
    name
}) {
    const { gameId } = useParams();
    const navigate = useNavigate();
    const deleteGame=useDeleteGame();

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
                <h1>Are you sure you want to delete {name}?</h1>
                <button onClick={onDelete}>Yes</button>
                <button onClick={onCancel}>No</button>
            </div>
        </div>

    )
}