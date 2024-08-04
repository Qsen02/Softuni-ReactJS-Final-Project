import { Link } from "react-router-dom"

import styles from "../../GameDetails.module.css"

import { useUserContext } from "../../../../context/userContext"

export default function GameDetailsComments({
    username,
    commentId,
    content,
    ownerName,
}) {
    const {user}=useUserContext();
    return (
        <div className={username == user?.username ? styles.yourComment : ""}>
            <h3>{ownerName == username? <span>@Publisher</span> : ""} {username}</h3>
            {username == user?.username
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