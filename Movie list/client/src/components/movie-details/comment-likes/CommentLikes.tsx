import { useNavigate, useParams } from "react-router-dom"

import { useGetOneComment } from "../../../hooks/useComments";
import CommentLikesDetails from "./comment-likes-details/CommentLikesDetails";

import styles from "../movie-details-likes/MovieDetailsLikes.module.css";

export default function CommentLikes() {
    const { movieId, commentId } = useParams();
    const { comment, loading, fetchError, setFetchError } = useGetOneComment({ content: "", username: "", likes: [] }, commentId);
    const navigate = useNavigate();

    function onBack() {
        try {
            navigate(`/catalog/${movieId}`);
        } catch (err) {
            if ((err as { message: string }).message == "Resource not found!") {
                navigate("/404");
                return;
            }
            setFetchError(true);
            return;
        }
    }
    return (
        <>
            {loading && !fetchError
                ? <div className={styles.loadingSpinner}></div>
                : ""
            }
            <div className={styles.modal}>
                <section>
                    <button onClick={onBack}>X</button>
                    <h2>Comment like list</h2>
                    {comment.likes.length == 0 && !loading && !fetchError
                        ? <h2>No likes yet</h2>
                        : loading && !fetchError
                            ? <h2>Likes loading...</h2>
                            : fetchError
                                ? <h2>Likes can't be loaded, please try again later.</h2>
                                : comment.likes.map(el => <CommentLikesDetails
                                    key={(el as { _id: string })._id}
                                    userId={(el as { _id: string })._id}
                                    image={(el as { profileImage: string }).profileImage}
                                    username={(el as { username: string }).username}
                                />)
                    }
                </section>
            </div>
        </>
    )
}