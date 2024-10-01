import { useNavigate, useParams } from "react-router-dom"
import { Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";

import { useGetOneComment } from "../../../hooks/useComments";
import { useCreateAnswer } from "../../../hooks/useAnswers";

import CustomInput from "../../../commons/CustomInput";
import AnswerDetails from "./answer-details/AnswerDetails";

import styles from "../comment-answers/CommentAnswers.module.css"

type User = {
    _id: string,
    username: string,
    email: string,
    isAdmin: boolean,
    accessToken: string,
    profileImage: string
} | null

type CommentAnswersProps={
    user:User|undefined
}

export default function CommentAnswers({
    user
}:CommentAnswersProps) {
    const { movieId, commentId } = useParams();
    const { comment, setComment, loading, setLoading, fetchError, setFetchError } = useGetOneComment({ username: "", content: "", ownerId: "", movieId: "", likes: [], answers: [] }, commentId);
    const navigate = useNavigate();
    const createAnswer = useCreateAnswer();
    const [errMessage, setErrMessage] = useState("");

    async function onAnswer(values: { content: string }, actions: FormikHelpers<{ content: string }>) {
        const content = values.content;
        try {
            if (!content) {
                throw new Error("Please, fill the field!");
            }
            setLoading(true);
            setErrMessage("");
            const comment = await createAnswer({ content, username: user?.username }, commentId);
            setComment(comment);
            actions.resetForm();
            setLoading(false);
        } catch (err) {
            setErrMessage((err as { message: string }).message);
            return;
        }
    }

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
                    <h2>Answers to {comment.username}</h2>
                    {user
                        ? <Formik initialValues={{ content: "" }} onSubmit={onAnswer}>
                            {
                                (props) => (
                                    <Form>
                                        {errMessage ? <p className={styles.errorMessage}>{errMessage}</p> : ""}
                                        <CustomInput type="text" name="content" placeholder="Enter answer..." />
                                        <button type="submit">Submit</button>
                                    </Form>
                                )

                            }
                        </Formik>
                        : ""
                    }
                    <section>
                        {comment.answers.length == 0 && !loading && !fetchError
                            ? <h3>No answers yet</h3>
                            : loading && !fetchError
                                ? <h3>Answers loading...</h3>
                                : fetchError
                                    ? <h3>Answers can't be loaded, please try again later.</h3>
                                    : comment.answers.map(el => <AnswerDetails
                                        key={el._id}
                                        id={el._id}
                                        username={el.username}
                                        content={el.content}
                                        movieId={movieId}
                                        commentId={commentId}
                                    />)
                        }
                    </section>
                </section>
            </div>
        </>
    )
}