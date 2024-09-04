import { Link } from "react-router-dom"

import styles from "../../GameDetails.module.css"

import { useUserContext } from "../../../../context/userContext"
import { useLikeComment, useUnlikeComment } from "../../../../hooks/useComments";
import { getGameById } from "../../../../api/gameService";

export default function GameDetailsComments({
    setGame,
    gameId,
    id,
    commentLikes,
    username,
    commentId,
    content,
    ownerName,
    answers
}) {
    const { user } = useUserContext();
    const likeComment = useLikeComment();
    const unlikeComment=useUnlikeComment();
    const {clearUserHandler}=useUserContext

    async function onLike() {
        try {
            await likeComment(id);
            const game=await getGameById(gameId);
            setGame(game);
        } catch (err) {
            if(err.message=="You dont't have credentials, please login or register!"){
                clearUserHandler();
                return;
            }
            alert(err.message);
            return;
        }
    }

    async function onUnlike(){
        try {
            await unlikeComment(id);
            const game=await getGameById(gameId);
            setGame(game);
        } catch (err) {
            if(err.message=="You dont't have credentials, please login or register!"){
                clearUserHandler();
                return;
            }
            alert(err.message);
            return;
        }
    }
    return (
        <div className={username == user?.username ? styles.yourComment : ""}>
            <h3>{ownerName == username ?<span>publisher</span> : ""}{username}</h3>
            {username == user?.username
                ? <>
                    <Link to={`comment/${commentId}/edit`}><i className="fa-solid fa-square-pen"></i></Link>
                    <Link to={`comment/${commentId}/delete`}><i className="fa-solid fa-trash"></i></Link>
                </>
                : ""
            }
            {user
                ? username != user?.username ?
                    <div className={styles.userLike}>
                        {commentLikes?.includes(user?._id)
                            ? <i onClick={onUnlike} name="liked" className="fa-solid fa-heart"></i>
                            : <i onClick={onLike} className="fa-regular fa-heart"></i>
                        }
                        <p>{commentLikes?.length}</p>
                    </div>
                    : <div className={styles.ownerLike}>
                        <i className="fa-solid fa-heart"></i>
                        <p>{commentLikes?.length}</p>
                    </div>
                : ""
            }
            <p>{content}</p>
            <Link to={`comment/${id}/answers`} className={styles.answers}>Answers({answers.length})</Link>
        </div>
    )
}