import { Link } from "react-router-dom"
import styles from "../GameDetails.module.css"

export default function GameDetailsComments({
    username,
    commentId,
    content,
    userData,
    ownerName,
}) {
    return (
        <div className={username == userData?.username ? styles.yourComment : ""}>
            <h3>{ownerName == username? <span>@Publisher</span> : ""} {username}</h3>
            {username == userData?.username
                ? <>
                    <Link to={`comment/${commentId}/edit`}><i className="fa-solid fa-square-pen"></i></Link>
                    <Link to={`comment/${commentId}/delete`}><i className="fa-solid fa-trash"></i></Link>
                </>
                : ""
            }
            <p>{content}</p>
        </div>
    )
}