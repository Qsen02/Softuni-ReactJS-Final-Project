import { Link } from "react-router-dom"

export default function GameDetailsComments({
    username,
    commentId,
    content,
}) {
    return (
        <div className="your-comment">
            <h3><span>@publisher</span> {username}</h3>
            <Link to={`/comment/${commentId}/edit`}><i className="fa-solid fa-square-pen"></i></Link>
            <Link to={`/comment/${commentId}/delete`}><i className="fa-solid fa-trash"></i></Link>
            <p>{content}</p>
        </div>
    )
}