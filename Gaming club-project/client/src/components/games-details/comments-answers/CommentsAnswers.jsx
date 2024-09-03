import { useNavigate, useParams } from "react-router-dom"
import { useCreateAnswer, useGetAllAnswers } from "../../../hooks/useAnswers"
import CommentsAnswersDetails from "./comments-answers-details/CommentsAnswersDetails";

import styles from "./CommentAnswers.module.css"
import { useUserContext } from "../../../context/userContext";

import { Form, Formik } from "formik";
import CustomInput from "../../../common/CustomInput";
import { useState } from "react";

export default function CommentsAnswers() {
    const { gameId, commentId } = useParams();
    const { user } = useUserContext();
    const createAnswer = useCreateAnswer();
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();
    const { answers, setAnswersHandler, loading, answersTo } = useGetAllAnswers([], commentId);

    async function onCreate(values, actions) {
        const content = values.content;
        const username = user?.username;
        try {
            if (!content) {
                throw new Error("Please, fill the field!");
            }
            const answers = await createAnswer(commentId, { content, username });
            setAnswersHandler(answers);
            actions.resetForm();
        } catch (err) {
            setErrorMsg(err.message);
            setError(true);
            return;
        }
    }

    function onBack(event) {
        event.stopPropagation();
        navigate(`/catalog/${gameId}`);
    }

    return (
            <div className={styles.modal}>
            {loading
                ? <div className={styles.loadingSpinner}></div>
                : ""
            }
            <div className={styles.wrapper}>
            <button className={styles.backDrop} onClick={onBack}>X</button>
                <h2>Answers to {answersTo.username}</h2>
                {error ? <p>{errorMsg}</p> : ""}
                <Formik initialValues={{ content: "" }} onSubmit={onCreate} className={styles.form}>
                    {
                        (props) => (
                            <Form className={styles.form}>
                                <CustomInput type="text" name="content" placeholder="Enter answer here..." />
                                <button type="submit">Answer</button>
                            </Form>
                        )
                    }
                </Formik>
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