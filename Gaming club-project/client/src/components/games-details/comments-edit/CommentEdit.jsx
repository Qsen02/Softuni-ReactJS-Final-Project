import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react";

import styles from "../../FormsAndErrors.module.css"
import { useEditComment, useGetCommentById } from "../../../hooks/useComments";
import { Form, Formik } from "formik";
import CustomInput from "../../../common/CustomInput";
import { useUserContext } from "../../../context/userContext";

export default function CommentEdit({
    setCurGame
}) {
    const [errMessage, setErrMessage] = useState("");
    const { gameId, commentId } = useParams();
    const editComment = useEditComment();
    const { comment } = useGetCommentById(commentId);
    const navigate = useNavigate();
    const [clicked, setClicked] = useState(false);
    const {clearUserHandler}=useUserContext();

    async function onEdit(values, actions) {
        const content = values.content;
        try {
            setClicked(true);
            if (!content) {
                setClicked(false);
                throw new Error("Please fill the field!");
            }
            const data = await editComment(commentId, { content });
            setCurGame(data);
            actions.resetForm();
            setClicked(false);
            navigate(`/catalog/${gameId}`);
        } catch (err) {
            if(err.message=="You dont't have credentials, please login or register!"){
                clearUserHandler();
                return;
            }
            if (err.message.includes("[")) {
                setErrMessage(JSON.parse(err.message));
                return;
            }
            setErrMessage(err.message);
            return;
        }
    }

    function onCancel() {
        setClicked(true);
        navigate(`/catalog/${gameId}`);
        setClicked(false);
    }

    return (
        <Formik initialValues={comment} onSubmit={onEdit} enableReinitialize={true}>
            {
                (props) => (
                    <div className={styles.modal}>
                        <Form className={styles.form}>
                            <h3>Edit your comment</h3>
                            <div className={styles.editComment}>
                                {errMessage instanceof Array
                                    ? <label className={styles.errorMessage}>{errMessage[0]}</label>
                                    : <label className={styles.errorMessage}>{errMessage}</label>
                                }
                                <CustomInput type="text" name="content" />
                                <div className={styles.buttons}>
                                    <button disabled={clicked ? true : false}  type="submit">Edit</button>
                                    <button disabled={clicked ? true : false}  onClick={onCancel}>Cancel</button>
                                </div>
                            </div>
                        </Form>
                    </div>
                )
            }
        </Formik>
    )
}