import { useParams } from "react-router-dom"
import { useGetOneComment } from "../../../hooks/useComments";
import { useUserContext } from "../../../context/userContext";
import AnswerDetails from "./answer-details/AnswerDetails";

export default function CommentAnswers() {
    const {user}=useUserContext();
    const { commentId } = useParams();
    const { comment } = useGetOneComment({ username: "", content: "", ownerId: "", movieId: "", likes: [], answers: [] }, commentId);

    return (
        <div>
            <section>
                <button>X</button>
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