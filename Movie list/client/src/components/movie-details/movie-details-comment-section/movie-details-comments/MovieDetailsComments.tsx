import { Link, useNavigate } from "react-router-dom";

import styles from "../../MovieDetails.module.css";

import { useLikeComment, useUnlikeComment } from "../../../../hooks/useComments";
import { useGetOneUser } from "../../../../hooks/useAuth";
import { onProfileImageError } from "../../../../utils/imageError";

type MovieDetailsCommentsType = {
    id: string,
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
    likes: {}[],
    movieId: string | undefined,
    setMovie: React.Dispatch<React.SetStateAction<{}>>,
    answers:{}[]
}

export default function MovieDetailsComments({
    id, content, commentOwnerId, movieOwnerId, user, likes, movieId, setMovie,answers
}: MovieDetailsCommentsType) {
    const navigate = useNavigate();
    const likeComment = useLikeComment();
    const unlikeComment = useUnlikeComment();
    const { curUser } = useGetOneUser({}, commentOwnerId);

    async function onLike() {
        try {
            const movie = await likeComment(id, movieId);
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
            const movie = await unlikeComment(id, movieId);
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
                <img src={(curUser as { profileImage: string }).profileImage} alt={user?.username} onError={onProfileImageError} />
                <h3 className={commentOwnerId == movieOwnerId ? styles.owner : ""}>{(curUser as { username: string }).username}</h3>
                {commentOwnerId == user?._id
                    ? <>
                        <Link to={`/catalog/${movieId}/comment/${id}/delete`} id={styles.delete}><i className="fa-solid fa-trash"></i></Link>
                        <Link to={`/catalog/${movieId}/comment/${id}/edit`} id={styles.edit}><i className="fa-solid fa-pen-to-square"></i></Link>
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
            <div>
                <Link to={`/catalog/${movieId}/comment/${id}/answers`}><i className="fa-solid fa-comments"></i></Link>
                <p>{answers.length}</p>
            </div>
        </section>
    )
}