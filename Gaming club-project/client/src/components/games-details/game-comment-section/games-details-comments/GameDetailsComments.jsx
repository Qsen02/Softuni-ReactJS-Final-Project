import { Link } from "react-router-dom"

import styles from "../../GameDetails.module.css"

import { useUserContext } from "../../../../context/userContext"

export default function GameDetailsComments({
    username,
    commentId,
    content,
    ownerName,
}) {
    const { user } = useUserContext();
    return (
        <div className={username == user?.username ? styles.yourComment : ""}>
            <h3 className={ownerName == username ? styles.ownerComment : ""}>{username}</h3>
            {username == user?.username
                ? <>
                    <Link to={`comment/${commentId}/edit`}><i className="fa-solid fa-square-pen"></i></Link>
                    <Link to={`comment/${commentId}/delete`}><i className="fa-solid fa-trash"></i></Link>
                </>
                : ""
            }
            {user
                ? username != user.username ?
                    <div className={styles.userLike}>
                        {/* <i name="liked" className="fa-solid fa-heart"></i> */}
                        <i className="fa-regular fa-heart"></i>
                        <p>0</p>
                    </div>
                    : <div className={styles.ownerLike}>
                        <i className="fa-solid fa-heart"></i>
                        <p>0</p>
                    </div>
                : ""
            }
            <p>{content}</p>
        </div>
    )
}