import { Link } from "react-router-dom"

type MovieDetailsButtonsType = {
    user: {
        _id: string,
        accessToken: string,
        username: string,
        email: string,
        isAdmin: boolean
    },
    ownerId: string,
    likes: [],
    saves: [],
    movieId: string|undefined
}

export default function MovieDetailsButtons({
    user, ownerId, likes, saves, movieId
}: MovieDetailsButtonsType) {
    const likesIds = likes.map(el => (el as { _id: string })._id);
    const savesIds = saves.map(el => (el as { _id: string })._id);
    return (
        <>
            {user._id == ownerId
                ? <>
                    <i className="fa-solid fa-thumbs-up">{likes.length}</i>
                    <Link to={`/catalog/${movieId}/edit`}><button>Edit</button></Link>
                    <Link to={`/catalog/${movieId}/delete`}><button>Delete</button></Link>
                    <i className="fa-solid fa-bookmark">{saves.length}</i>
                </>
                : <>
                    {likesIds.includes(user._id)
                        ? <i className="fa-solid fa-thumbs-up">{likes.length}</i>
                        : <i className="fa-regular fa-thumbs-up">{likes.length}</i>
                    }
                    {savesIds.includes(user._id)
                        ? <i className="fa-solid fa-bookmark">{saves.length}</i>
                        : <i className="fa-regular fa-bookmark">{saves.length}</i>
                    }
                </>
            }
        </>
    )
}