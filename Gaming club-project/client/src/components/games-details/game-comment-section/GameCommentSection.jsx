import GameDetailsComments from "./games-details-comments/GameDetailsComments";

import styles from "../GameDetails.module.css"
import { useUserContext } from "../../../context/userContext";

export default function GameCommentSection({
    formValues,
    changeHandler,
    submitHandler,
    commentCount,
    comments,
    error,
    hasError,
    ownerName
}) {
    const {user}=useUserContext();

    return (
        <section className={styles.comments}>
            <details>
                <summary>Comments:<span>{commentCount}</span></summary>
                {hasError ? <label className={styles.errorMessage}>{error}</label> : ""}
                <div className={styles.commentContent}>
                    {user
                        ? <form onSubmit={submitHandler}>
                            <input type="text" name="content" placeholder="Enter comment..." value={formValues.comment} onChange={changeHandler} />
                            <button type="submit">Comment</button>
                        </form>
                        : ""}
                    {commentCount== 0
                        ? <h3>No comments yet, be the first one!</h3>
                        : comments.map(el =>
                            <GameDetailsComments
                                key={el._id}
                                commentId={el._id}
                                content={el.content}
                                username={el.username}
                                ownerName={ownerName}
                            />
                        )
                    }
                </div>
            </details>
        </section>
    )
}