import { Link, useNavigate } from "react-router-dom";
import styles from "../../MovieDetails.module.css";
import { useLikeComment, useUnlikeComment } from "../../../../hooks/useComments";

type MovieDetailsCommentsType = {
    id: string,
    username: string,
    content: string,
    commentOwnerId: string,
    movieOwnerId: string,
    user: {
        _id: string,
        username: string,
        email: string,
        isAdmin: boolean,
        accessToken: string
    } | null | undefined,
    likes: [],
    movieId: string | undefined,
    setMovie: React.Dispatch<React.SetStateAction<{}>>
}

export default function MovieDetailsComments({
    id, username, content, commentOwnerId, movieOwnerId, user, likes, movieId, setMovie
}: MovieDetailsCommentsType) {
    const navigate = useNavigate();
    const likeComment = useLikeComment();
    const unlikeComment = useUnlikeComment();

    async function onLike() {
        try {
            const movie = await likeComment(id,movieId);
            setMovie(movie);
        } catch (err) {
            if ((err as { message: string }).message == "Resource not found!") {
                navigate("/404");
                return;
            }
            return
        }
    }

    async function onUnlike() {
        try {
            const movie = await unlikeComment(id,movieId);
            setMovie(movie);
        } catch (err) {
            if ((err as { message: string }).message == "Resource not found!") {
                navigate("/404");
                return;
            }
            return
        }
    }

    return (
        <section className={commentOwnerId == user?._id ? styles.yourComment : ""}>
            <article className={commentOwnerId == user?._id ? styles.yourComment : ""}>
                <h2 className={commentOwnerId == movieOwnerId ? styles.owner : ""}>{username}</h2>
                {commentOwnerId == user?._id
                    ? <>
                        <Link to={`/catalog/${movieId}/comment/${id}/delete`}><i className="fa-solid fa-trash"></i></Link>
                        <Link to={`/catalog/${movieId}/comment/${id}/edit`}><i className="fa-solid fa-pen-to-square"></i></Link>
                    </>
                    : ""
                }
                {commentOwnerId == user?._id
                    ? <>
                        <i id={styles.ownerCommentLikes} className="fa-solid fa-thumbs-up"></i>
                        <Link to={`/catalog/${movieId}/comment/${id}/likes`}><p>{likes.length}</p></Link>
                    </>
                    : !user
                        ? <>
                            <i id={styles.guestCommentLikes} className="fa-solid fa-thumbs-up"></i>
                            <p>{likes.length}</p>
                        </>
                        : likes.includes(user?._id)
                            ? <>
                                <i onClick={onUnlike} id={styles.commentLikes} className="fa-solid fa-thumbs-up"></i>
                                <Link to={`/catalog/${movieId}/comment/${id}/likes`}><p>{likes.length}</p></Link>
                            </>
                            : <>
                                <i onClick={onLike} id={styles.commentLikes} className="fa-regular fa-thumbs-up"></i>
                                <Link to={`/catalog/${movieId}/comment/${id}/likes`}><p>{likes.length}</p></Link>
                            </>
                }
            </article>
            <p>{content}</p>
        </section>
    )
}