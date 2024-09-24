import { Link } from "react-router-dom";

import { useUserContext } from "../../../../context/userContext";
import { useGetOneAnswer } from "../../../../hooks/useAnswers"
import { onProfileImageError } from "../../../../utils/imageError"

import styles from "../CommentAnswers.module.css";

type AnswerDetailsProps = {
    id: string,
    username: string,
    content: string,
    movieId: string | undefined,
    commentId: string | undefined,
}

export default function AnswerDetails({
    id, username, content, movieId, commentId
}: AnswerDetailsProps) {
    const initialvalues = {
        _id: "",
        username: "",
        content: "",
        ownerId: {
            _id: "",
            username: "",
            email: "",
            isAdmin: false,
            accessToken: "",
            profileImage: ""
        },
        likes: []
    }
    const { answer } = useGetOneAnswer(initialvalues, id);
    const { user } = useUserContext();

    return (
        <article className={answer.ownerId._id == user?._id ? styles.yourAnswer : ""}>
            <img src={answer.ownerId.profileImage} alt={username} onError={onProfileImageError} />
            <h3>{username}</h3>
            {answer.ownerId._id == user?._id
                ? <>
                    <Link to={`/catalog/${movieId}/comment/${commentId}/answer/${id}/delete`} id={styles.delete}><i className="fa-solid fa-trash"></i></Link>
                    <Link to={`/catalog/${movieId}/comment/${commentId}/asnwer/${id}/edit`} id={styles.edit}><i className="fa-solid fa-pen-to-square"></i></Link>
                </>
                : ""
            }
            {answer.ownerId._id == user?._id
                ? <>
                    <i id={styles.ownerAnswerLikes} className="fa-solid fa-thumbs-up"></i>
                    <Link to={`/catalog/${movieId}/comment/${commentId}/answer/${id}/likes`}><p>{answer.likes.length}</p></Link>
                </>
                : !user
                    ? <>
                        <i id={styles.guestAnswerLikes} className="fa-solid fa-thumbs-up"></i>
                        <p>{answer.likes.length}</p>
                    </>
                    : answer.likes.includes(user?._id)
                        ? <>
                            <i id={styles.answerLikes} className="fa-solid fa-thumbs-up"></i>
                            <Link to={`/catalog/${movieId}/comment/${id}/likes`}><p>{answer.likes.length}</p></Link>
                        </>
                        : <>
                            <i id={styles.answerLikes} className="fa-regular fa-thumbs-up"></i>
                            <Link to={`/catalog/${movieId}/comment/${id}/likes`}><p>{answer.likes.length}</p></Link>
                        </>
            }
            <div className={styles.content}>
                <p>{content}</p>
            </div>
        </article>
    )
}