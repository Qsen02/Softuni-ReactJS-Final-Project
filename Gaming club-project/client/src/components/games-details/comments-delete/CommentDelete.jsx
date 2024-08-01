import { useNavigate, useParams } from "react-router-dom"
import styles from "../../game-delete/GameDelete.module.css"

import { useDeleteComment } from "../../../hooks/useComments";

export default function CommentDelete({
    setCurGame
}) {
    const { gameId, commentId } = useParams();
    const navigate = useNavigate();
    const deleteComment=useDeleteComment();

    function onCancel() {
        navigate(`/catalog/${gameId}`);
    }

    async function onDelete() {
        try {
            const data = await deleteComment(commentId);
            setCurGame(data);
            navigate(`/catalog/${gameId}`);
        } catch (err) {
            if (err.message == "Resource not found!") {
                navigate("/404");
                return;
            }
            return;
        }
    }

    return (
        <div className={styles.modal}>
            <div className={styles.deleteWrapper}>
                <h1>Are you sure you want to delete this comment?</h1>
                <button onClick={onDelete}>Yes</button>
                <button onClick={onCancel}>No</button>
            </div>
        </div>
    )
}