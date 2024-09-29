import { Link, useNavigate } from "react-router-dom";

import { useUserContext } from "../../../../context/userContext";
import { useGetOneAnswer, useLikeAnswer, useUnlikeAnswer } from "../../../../hooks/useAnswers"
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
    const { answer,setAnswer } = useGetOneAnswer(initialvalues, id);
    const { user } = useUserContext();
    const likeAnswer = useLikeAnswer();
    const unlikeAnswer = useUnlikeAnswer();
    const navigate=useNavigate();
    const answerLikes=answer.likes.map(el=>(el as {_id:string})._id);

    async function onLike() {
        try {
            const answer = await likeAnswer(id, commentId);
            setAnswer(answer);
            navigate(`/catalog/${movieId}/comment/${commentId}/answers`);
        } catch (err) {
            if ((err as { message: string }).message == "Resource not found!") {
                navigate("/404");
                return;
            }
            return;
        }
    }

    async function onUnlike() {
        try {
            const answer = await unlikeAnswer(id, commentId);
            setAnswer(answer);
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
        <article className={answer.ownerId._id == user?._id ? styles.yourAnswer : ""}>
            <img src={answer.ownerId.profileImage} alt={username} onError={onProfileImageError} />
            <h3>{username}</h3>
            {answer.ownerId._id == user?._id
                ? <>
                    <Link to={`/catalog/${movieId}/comment/${commentId}/answer/${id}/delete`} id={styles.delete}><i className="fa-solid fa-trash"></i></Link>
                    <Link to={`/catalog/${movieId}/comment/${commentId}/answer/${id}/edit`} id={styles.edit}><i className="fa-solid fa-pen-to-square"></i></Link>
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
                    : answerLikes.includes(user?._id)
                        ? <>
                            <i onClick={onUnlike} id={styles.answerLikes} className="fa-solid fa-thumbs-up"></i>
                            <Link to={`/catalog/${movieId}/comment/${commentId}/answer/${id}/likes`}><p>{answer.likes.length}</p></Link>
                        </>
                        : <>
                            <i onClick={onLike} id={styles.answerLikes} className="fa-regular fa-thumbs-up"></i>
                            <Link to={`/catalog/${movieId}/comment/${commentId}/answer/${id}/likes`}><p>{answer.likes.length}</p></Link>
                        </>
            }
            <div className={styles.content}>
                <p>{content}</p>
            </div>
        </article>
    )
}