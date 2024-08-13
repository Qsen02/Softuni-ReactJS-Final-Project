import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react";

import styles from "../../FormsAndErrors.module.css"
import { useEditComment, useGetCommentById } from "../../../hooks/useComments";
import { useForm } from "../../../hooks/useForm";
import { Form, Formik } from "formik";
import CustomInput from "../../../common/CustomInput";

export default function CommentEdit({
    setCurGame
}) {
    const [errMessage, setErrMessage] = useState("");
    const { gameId, commentId } = useParams();
    const editComment = useEditComment();
    const { comment } = useGetCommentById(commentId);
    const navigate = useNavigate();

    async function onEdit(values, actions) {
        const content = values.content;
        try {
            if (!content) {
                throw new Error("Please fill the field!");
            }
            const data = await editComment(commentId, { content });
            setCurGame(data);
            actions.resetForm();
            navigate(`/catalog/${gameId}`);
        } catch (err) {
            console.log(err.message);
            setErrMessage(err.message);
            return;
        }
    }

    function onCancel() {
        navigate(`/catalog/${gameId}`);
    }

    return (
        <Formik initialValues={comment} onSubmit={onEdit} enableReinitialize={true}>
            {
                (props) => (
                    <div className={styles.modal}>
                        <Form className={styles.form}>
                            <h3>Edit your comment</h3>
                            <div className={styles.editComment}>
                                {errMessage
                                    ? <label className={styles.errorMessage}>{errMessage}</label>
                                    : ""
                                }
                                <CustomInput type="text" name="content" />
                                <div className={styles.buttons}>
                                    <button type="submit">Edit</button>
                                    <button onClick={onCancel}>Cancel</button>
                                </div>
                            </div>
                        </Form>
                    </div>
                )
            }
        </Formik>
    )
}