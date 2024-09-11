type MovieDetailsCommentsType = {
    id: string,
    username: string,
    content: string,
    commentOwnerId: string,
    movieOwnerId: string,
    user: {
        _id: string,
        username: string,
        email: string,
        isAdmin: boolean,
        accessToken: string
    } | null | undefined,
    likes: []
}

export default function MovieDetailsComments({
    id, username, content, commentOwnerId, movieOwnerId, user, likes
}: MovieDetailsCommentsType) {
    const likesIds = likes.map(el => (el as { _id: string })._id);
    return (
        <div>
            <div>
                <h2>{username}</h2>
                {commentOwnerId == user?._id
                    ? <>
                        <i className="fa-solid fa-trash"></i>
                        <i className="fa-solid fa-pen-to-square"></i>
                    </>
                    : ""
                }
                {user && likesIds.includes(user._id)
                    ? <i className="fa-solid fa-thumbs-up"></i>
                    : <i className="fa-regular fa-thumbs-up"></i>
                }
            </div>
            <p>{content}</p>
        </div>
    )
}