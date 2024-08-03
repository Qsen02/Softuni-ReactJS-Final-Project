import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react";

import styles from "../../FormsAndErrors.module.css"
import { useEditComment, useGetCommentById } from "../../../hooks/useComments";
import { useForm } from "../../../hooks/useForm";
import { useGetOneGame } from "../../../hooks/useGames";

export default function CommentEdit({
    setCurGame
}) {
    const [errMessage, setErrMessage] = useState({});
    const [isError, setIsError] = useState(false);
    const { gameId, commentId } = useParams();
    const editComment = useEditComment();
    const {comment}=useGetCommentById(commentId);
    const navigate=useNavigate();
    const { formValues, changeHandler, submitHandler } = useForm(comment, onEdit,true);

    async function onEdit() {
        const content = formValues.content;
        try {
            const data = await editComment(commentId, { content });
            setCurGame(data);
            navigate(`/catalog/${gameId}`);
        } catch (err) {
            setErrMessage(JSON.parse(err.message));
            setIsError(true);
        }
    }

    function onCancel(){
        navigate(`/catalog/${gameId}`);
    }

    return (
        <div className={styles.modal}>
            <form onSubmit={submitHandler} className={styles.form}>
                <h3>Edit your comment</h3>
                <div className={styles.editComment}>
                    {errMessage instanceof Array
                        ? <label className={styles.errorMessage}>{errMessage[0]}</label>
                        : errMessage.content
                            ? <label className={styles.errorMessage}>{errMessage.content}</label>
                            : ""
                    }
                    <input type="text" name="content" value={formValues.content} onChange={changeHandler} />
                    <div className={styles.buttons}>
                        <button type="submit">Edit</button>
                        <button onClick={onCancel}>Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    )
}