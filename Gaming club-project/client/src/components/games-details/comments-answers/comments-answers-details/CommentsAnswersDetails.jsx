import { Link } from "react-router-dom";

import { useUserContext } from "../../../../context/userContext";

import styles from "../CommentAnswers.module.css";

export default function CommentsAnswersDetails({
    id, content, username, ownerId
}) {
    const {user}=useUserContext();
    return (
        <div className={ownerId == user?._id?styles.yourAnswer:""}>
            <h2>{username}</h2>
            {ownerId == user?._id
                ? <>
                    <Link to={`answer/${id}/edit`}><i className="fa-solid fa-square-pen"></i></Link>
                    <Link to={`answer/${id}/delete`}><i className="fa-solid fa-trash"></i></Link>
                </>
                : ""
            }
            <p>{content}</p>
        </div>
    )
}