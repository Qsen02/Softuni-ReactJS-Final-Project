import { useParams } from "react-router-dom"
import { useGetAllAnswers } from "../../../hooks/useAnswers"
import CommentsAnswersDetails from "./comments-answers-details/CommentsAnswersDetails";

export default function CommentsAnswers() {
    const { commentId } = useParams();
    const { answers, setAnswersHandler, loading,answersTo } = useGetAllAnswers([], commentId);

    return (
        <div>
            {loading
                ? <div></div>
                : ""
            }
            <h2>Answers to {answersTo.username}</h2>
            <form>
                <input type="text" name="content" placeholder="Enter answer here" />
                <button>Answer</button>
            </form>
            <div>
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
    )
}