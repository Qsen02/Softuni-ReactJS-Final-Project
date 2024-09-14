import { useNavigate, useParams } from "react-router-dom";
import { Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";

import CustomInput from "../../../commons/CustomInput";
import { useGetOneComment } from "../../../hooks/useComments";

import styles from "../../FormsAndErrors.module.css"
import { editComment } from "../../../api/commentService";

type CommentEditProps = {
    setMovie: React.Dispatch<React.SetStateAction<{}>>
}

export default function CommentEdit({
    setMovie
}: CommentEditProps) {
    const { movieId, commentId } = useParams();
    const { comment } = useGetOneComment({ content: "", username: "" }, commentId);
    const navigate = useNavigate();
    const [errMsg, setErrMsg] = useState("");

    async function onEdit(values: { content: string }, actions: FormikHelpers<{ content: string }>) {
        const content = values.content;
        try {
            if (!content) {
                throw new Error("Please, fill the field!");
            }
            const movie = await editComment(commentId, movieId, { username: comment.username, content });
            actions.resetForm();
            setMovie(movie);
            navigate(`/catalog/${movieId}`);
        } catch (err) {
            setErrMsg((err as { message: string }).message);
            return;
        }
    }

    function onCancel() {
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
        <Formik initialValues={{ content: comment.content }} onSubmit={onEdit} enableReinitialize={true}>
            {
                (props) => (
                    <div className={styles.modal}>
                        <Form className={styles.form}>
                            <h2>Edit your comment</h2>
                            {errMsg ? <p className={styles.error}>{errMsg}</p> : ""}
                            <CustomInput type="text" name="content" />
                            <button type="submit" className={styles.editFormButtons}>Edit</button>
                            <button onClick={onCancel} className={styles.editFormButtons}>Cancel</button>
                        </Form>
                    </div>
                )
            }
        </Formik>
    )
}