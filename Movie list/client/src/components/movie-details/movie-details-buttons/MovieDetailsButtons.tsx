import { Link } from "react-router-dom";

import styles from "../MovieDetails.module.css"

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
    movieId: string | undefined
}

export default function MovieDetailsButtons({
    user, ownerId, likes, saves, movieId
}: MovieDetailsButtonsType) {
    const likesIds = likes.map(el => (el as { _id: string })._id);
    const savesIds = saves.map(el => (el as { _id: string })._id);
    return (
        <>
            {user._id == ownerId
                ? <article className={styles.adminButtons}>
                    <div>
                        <i className="fa-solid fa-thumbs-up"></i>
                        <p>{likes.length}</p>
                    </div>
                    <Link to={`/catalog/${movieId}/edit`}><button>Edit</button></Link>
                    <Link to={`/catalog/${movieId}/delete`}><button>Delete</button></Link>
                    <div>
                        <i className="fa-solid fa-bookmark"></i>
                        <p>{saves.length}</p>
                    </div>
                </article>
                : <article className={styles.userButtons}>
                    {likesIds.includes(user._id)
                        ? <div>
                            <i className="fa-solid fa-thumbs-up"></i>
                            <p>{likes.length}</p>
                        </div>
                        : <div>
                            <i className="fa-regular fa-thumbs-up"></i>
                            <p>{likes.length}</p>
                        </div>
                    }
                    {savesIds.includes(user._id)
                        ? <div>
                            <i className="fa-solid fa-bookmark"></i>
                            <p>{saves.length}</p>
                        </div>
                        : <div>
                            <i className="fa-regular fa-bookmark"></i>
                            <p>{saves.length}</p>
                        </div>
                    }
                </article>
            }
        </>
    )
}