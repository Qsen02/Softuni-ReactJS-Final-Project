import { useNavigate, useParams } from "react-router-dom"
import { Form, Formik } from "formik";
import { useState } from "react";

import styles from "../../FormsAndErrors.module.css"

import { useEditAnswer, useGetOneAnswer } from "../../../hooks/useAnswers"
import CustomInput from "../../../common/CustomInput";
import { useUserContext } from "../../../context/userContext";

export default function EditAnswer() {
    const { answerId, commentId, gameId } = useParams();
    const { answer } = useGetOneAnswer({}, answerId);
    const { user, clearUserHandler } = useUserContext();
    const [clicked, setClicked] = useState(false);
    const navigate = useNavigate();
    const [errMsg, setErrMsg] = useState("");
    const editAnswer = useEditAnswer();

    async function onEdit(values, actions) {
        const content = values.content;
        const username = user.username;
        try {
            setClicked(true);
            if (!content) {
                setClicked(false);
                throw new Error("Please, fill the field!");
            }
            await editAnswer(answerId, { content, username });
            actions.resetForm();
            navigate(`/catalog/${gameId}/comment/${commentId}/answers`);
            setClicked(false);
        } catch (err) {
            if (err.message == "You dont't have credentials, please login or register!") {
                clearUserHandler();
                return;
            }
            if (err.message.includes("[")) {
                setErrMsg(JSON.parse(err.message));
                return;
            }
            setErrMsg(err.message);
            return;
        }
    }

    function onCancel() {
        setClicked(true);
        navigate(`/catalog/${gameId}/comment/${commentId}/answers`);
        setClicked(false);
    }

    return (
        <Formik initialValues={{ content: answer?.content }} enableReinitialize={true} onSubmit={onEdit}>
            {
                (props) => (
                    <div className={styles.modal}>
                        <Form className={styles.form}>
                            <h2>Edit your answer</h2>
                            {errMsg instanceof Array
                                ? <p className={styles.errorMessage}>{errMsg[0]}</p>
                                : <p className={styles.errorMessage}>{errMsg}</p>
                            }
                            <CustomInput type="text" name="content" />
                            <div className={styles.buttons}>
                                <button type="submit" disabled={clicked ? true : false}>Edit</button>
                                <button disabled={clicked ? true : false} onClick={onCancel}>Cancel</button>
                            </div>
                        </Form>
                    </div>
                )
            }
        </Formik>
    )
}