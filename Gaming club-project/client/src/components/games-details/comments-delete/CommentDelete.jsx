import { useNavigate, useParams } from "react-router-dom"
import styles from "../../game-delete/GameDelete.module.css"

import { useDeleteComment } from "../../../hooks/useComments";
import { useState } from "react";
import { useUserContext } from "../../../context/userContext";

export default function CommentDelete({
    setCurGame
}) {
    const { gameId, commentId } = useParams();
    const navigate = useNavigate();
    const deleteComment=useDeleteComment();
    const [clicked, setClicked] = useState(false);
    const {clearUserHandler}=useUserContext();

    function onCancel() {
        setClicked(true);
        navigate(`/catalog/${gameId}`);
        setClicked(false);
    }

    async function onDelete() {
        try {
            setClicked(true);
            const data = await deleteComment(commentId);
            setCurGame(data);
            setClicked(false);
            navigate(`/catalog/${gameId}`);
        } catch (err) {
            if(err.message=="You dont't have credentials, please login or register!"){
                clearUserHandler();
                return;
            }
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
                <button disabled={clicked ? true : false} onClick={onDelete}>Yes</button>
                <button disabled={clicked ? true : false} onClick={onCancel}>No</button>
            </div>
        </div>
    )
}