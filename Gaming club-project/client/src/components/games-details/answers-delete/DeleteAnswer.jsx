import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react";

import styles from "../../game-delete/GameDelete.module.css"

import { useDeleteAnswer } from "../../../hooks/useAnswers";
import { useUserContext } from "../../../context/userContext";
import CommentEdit from "../comments-edit/CommentEdit";

export default function DeleteAnswer() {
    const { gameId, commentId, answerId } = useParams();
    const deleteAnswer = useDeleteAnswer();
    const navigate = useNavigate();
    const { clearUserHandler } = useUserContext();
    const [clicked, setClicked] = useState(false);

    async function onDelete() {
        try {
            setClicked(true);
            await deleteAnswer(answerId,commentId);
            navigate(`/catalog/${gameId}/comment/${commentId}/answers`);
            setClicked(false);
        } catch (err) {
            if (err.message == "You dont't have credentials, please login or register!") {
                clearUserHandler();
                return;
            }
            return;
        }
    }

    function onBack() {
        setClicked(true);
        navigate(`/catalog/${gameId}/comment/${commentId}/answers`);
        setClicked(false);
    }

    return (
        <div className={styles.modal}>
            <div className={styles.deleteWrapper}>
                <h1>Are you sure you want to delete this answer?</h1>
                <button disabled={clicked ? true : false} onClick={onDelete}>Yes</button>
                <button disabled={clicked ? true : false} onClick={onBack}>No</button>
            </div>
        </div>
    )
}