import { useNavigate, useParams } from "react-router-dom"

import { useGetOneComment } from "../../../hooks/useComments";
import { useUserContext } from "../../../context/userContext";
import AnswerDetails from "./answer-details/AnswerDetails";

import styles from "../comment-answers/CommentAnswers.module.css"

export default function CommentAnswers() {
    const { user } = useUserContext();
    const { movieId, commentId } = useParams();
    const { comment } = useGetOneComment({ username: "", content: "", ownerId: "", movieId: "", likes: [], answers: [] }, commentId);
    const navigate = useNavigate();

    function onBack() {
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
                <h2>Answers to {comment.username}</h2>
                <form>
                    <input type="text" name="content" placeholder="Enter answer..." />
                    <button type="submit">Submit</button>
                </form>
                <section>
                    {comment.answers.length == 0
                        ? <h3>No answers yet</h3>
                        : comment.answers.map(el => <AnswerDetails
                            key={el._id}
                            id={el._id}
                            username={el.username}
                            content={el.content}
                            profileImage={user?.profileImage}
                        />)
                    }
                </section>
            </section>
        </div>
    )
}