import GameDetailsComments from "./games-details-comments/GameDetailsComments";

import styles from "../GameDetails.module.css"
import { useUserContext } from "../../../context/userContext";
import { Form, Formik } from "formik";
import CustomInput from "../../../common/CustomInput";

export default function GameCommentSection({
    setGame,
    gameId,
    submitHandler,
    commentCount,
    comments,
    error,
    hasError,
    ownerName,
    clicked
}) {
    const { user } = useUserContext();

    return (
        <section className={styles.comments}>
            <details>
                <summary>Comments:<span>{commentCount}</span></summary>
                {hasError ? <label className={styles.errorMessage}>{error}</label> : ""}
                <div className={styles.commentContent}>
                    {user
                        ?
                        <Formik initialValues={{ content: "" }} onSubmit={submitHandler}>
                            {
                                (props) => (
                                    <Form>
                                        <CustomInput type="text" name="content" placeholder="Enter comment..." />
                                        <button disabled={clicked ? true : false} type="submit">Comment</button>
                                    </Form>
                                )
                            }
                        </Formik>
                        : ""}
                    {commentCount == 0
                        ? <h3>No comments yet, be the first one!</h3>
                        : comments.map(el =>
                            <GameDetailsComments
                                key={el._id}
                                setGame={setGame}
                                gameId={gameId}
                                id={el._id}
                                commentLikes={el.likes}
                                commentId={el._id}
                                content={el.content}
                                username={el.username}
                                answers={el.answers}
                                ownerName={ownerName}
                            />
                        )
                    }
                </div>
            </details>
        </section>
    )
}