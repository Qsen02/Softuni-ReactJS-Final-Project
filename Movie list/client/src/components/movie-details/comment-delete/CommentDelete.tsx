import { useNavigate, useParams } from "react-router-dom";
import { useDeleteComment } from "../../../hooks/useComments"

import styles from "../../logout/Logout.module.css"

type CommentDeleteProps = {
    setMovie: React.Dispatch<React.SetStateAction<{}>>
}

export default function CommentDelete({
    setMovie
}:CommentDeleteProps) {
    const { movieId, commentId } = useParams();
    const deleteComment = useDeleteComment();
    const navigate = useNavigate();

    async function onDelete() {
        try {
            const movie = await deleteComment(commentId, movieId);
            setMovie(movie);
            navigate(`/catalog/${movieId}`);
        } catch (err) {
            if ((err as { message: string }).message == "Resource not found!") {
                navigate("/404");
                return;
            }
        }
    }

    function onCancel(){
        try {
            navigate(`/catalog/${movieId}`)
        } catch (err) {
            if ((err as { message: string }).message == "Resource not found!") {
                navigate("/404");
                return;
            }
        }
    }

    return (
        <div className={styles.modal}>
            <section>
                <h2>Are you sure you want to delete this comment?</h2>
                <button onClick={onDelete}>Yes</button>
                <button onClick={onCancel}>No</button>
            </section>
        </div>
    )
}