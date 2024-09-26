import { useNavigate, useParams } from "react-router-dom"
import styles from "../../logout/Logout.module.css"
import { useDeleteAnswer } from "../../../hooks/useAnswers";

export default function AnswerDelete() {
    const { movieId, commentId, answerId } = useParams();
    const navigate = useNavigate();
    const deleteAnswer = useDeleteAnswer();

    async function onDelete() {
        try {
            await deleteAnswer(answerId, commentId);
            navigate(`/catalog/${movieId}/comment/${commentId}/answers`);
        } catch (err) {
            if ((err as { message: string }).message == "Resource not found!") {
                navigate("/404");
                return;
            }
            return;
        }
    }

    function onCancel() {
        try {
            navigate(`/catalog/${movieId}/comment/${commentId}/answers`);
        } catch (err) {
            if ((err as { message: string }).message == "Resource not found!") {
                navigate("/404");
                return;
            }
            return;
        }
    }

    return (
        <div className={styles.modal}>
            <section>
                <h2>Are you sure you want to delete this answer?</h2>
                <button onClick={onDelete}>Yes</button>
                <button onClick={onCancel}>No</button>
            </section>
        </div>
    )
}