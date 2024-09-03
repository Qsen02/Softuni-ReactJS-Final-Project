import { useParams } from "react-router-dom"
import { useGetAllAnswers } from "../../../hooks/useAnswers"
import CommentsAnswersDetails from "./comments-answers-details/CommentsAnswersDetails";

import styles from "./CommentAnswers.module.css"

export default function CommentsAnswers() {
    const { commentId } = useParams();
    const { answers, setAnswersHandler, loading, answersTo } = useGetAllAnswers([], commentId);

    return (
        <div className={styles.modal}>
            {loading
                ? <div className={styles.loadingSpinner}></div>
                : ""
            }
            <div className={styles.wrapper}>
                <h2>Answers to {answersTo.username}</h2>
                <form>
                    <input type="text" name="content" placeholder="Enter answer here" />
                    <button>Answer</button>
                </form>
                <div className={styles.answers}>
                    {answers.length > 0 && !loading
                        ? answers.map(el => <CommentsAnswersDetails
                            key={el._id}
                            id={el._id}
                            content={el.content}
                            username={el.username}
                            ownerId={el.ownerId}
                        />)
                        : <h2>No answers yet</h2>
                    }
                    {answers.length == 0 && loading
                        ? <h2>Loading answers</h2>
                        : ""
                    }
                </div>

            </div>
        </div>
    )
}