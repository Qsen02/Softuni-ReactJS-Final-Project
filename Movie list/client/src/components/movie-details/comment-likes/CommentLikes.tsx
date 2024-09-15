import { useNavigate, useParams } from "react-router-dom"

import { useGetOneComment } from "../../../hooks/useComments";
import CommentLikesDetails from "./comment-likes-details/CommentLikesDetails";

import styles from "../movie-details-likes/MovieDetailsLikes.module.css";

export default function CommentLikes() {
    const {movieId, commentId } = useParams();
    const { comment } = useGetOneComment({ content: "", username: "", likes: [] }, commentId);
    const navigate=useNavigate();

    function onBack(){
        try {
            navigate(`/catalog/${movieId}`);
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
                <button onClick={onBack}>X</button>
                <h2>Comment like list</h2>
                {comment.likes.length > 0
                    ? comment.likes.map(el => <CommentLikesDetails
                        key={(el as { _id: string })._id}
                        userId={(el as { _id: string })._id}
                        image={(el as { profileImage: string }).profileImage}
                        username={(el as { username: string }).username}
                    />)
                    : <h2>No likes yet</h2>
                }
            </section>
        </div>
    )
}