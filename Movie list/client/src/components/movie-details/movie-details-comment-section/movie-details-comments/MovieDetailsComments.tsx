import { Link } from "react-router-dom";
import styles from "../../MovieDetails.module.css";

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
    movieId:string|undefined
}

export default function MovieDetailsComments({
    id, username, content, commentOwnerId, movieOwnerId, user, likes,movieId
}: MovieDetailsCommentsType) {
    const likesIds = likes.map(el => (el as { _id: string })._id);
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
                        <p>{likes.length}</p>
                    </>
                    : !user
                        ? <>
                            <i id={styles.guestCommentLikes} className="fa-solid fa-thumbs-up"></i>
                            <p>{likes.length}</p>
                        </>
                        : likesIds.includes(user._id)
                            ? <>
                                <i id={styles.commentLikes} className="fa-solid fa-thumbs-up"></i>
                                <p>{likes.length}</p>
                            </>
                            : <>
                                <i id={styles.commentLikes} className="fa-regular fa-thumbs-up"></i>
                                <p>{likes.length}</p>
                            </>
                }
            </article>
            <p>{content}</p>
        </section>
    )
}