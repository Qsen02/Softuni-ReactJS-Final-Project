import { Link, useNavigate } from "react-router-dom";

import styles from "../MovieDetails.module.css";

import { useLikeMovie, useSaveMovie, useUnlikeMovie, useUnsaveMovie } from "../../../hooks/useMovies";

type MovieDetailsButtonsType = {
    user: {
        _id: string,
        accessToken: string,
        username: string,
        email: string,
        isAdmin: boolean
    },
    ownerId: string,
    setMovie: React.Dispatch<React.SetStateAction<{}>>,
    likes: [],
    saves: [],
    movieId: string | undefined
}

export default function MovieDetailsButtons({
    user, ownerId, setMovie, likes, saves, movieId
}: MovieDetailsButtonsType) {
    const likesIds = likes.map(el => (el as { _id: string })._id);
    const savesIds = saves.map(el => (el as { _id: string })._id);
    const likeMovie = useLikeMovie();
    const unlikeMovie = useUnlikeMovie();
    const saveMovie = useSaveMovie();
    const unsaveMovie = useUnsaveMovie();
    const navigate = useNavigate();

    async function onLike() {
        try {
            const movie = await likeMovie(movieId);
            setMovie(movie);
        } catch (err) {
            if ((err as { message: string }).message == "Resource not found!") {
                navigate(`404`);
                return;
            }
            return;
        }
    }

    async function onUnlike() {
        try {
            const movie = await unlikeMovie(movieId);
            setMovie(movie);
        } catch (err) {
            if ((err as { message: string }).message == "Resource not found!") {
                navigate(`404`);
                return;
            }
            return;
        }
    }
    async function onSave() {
        try {
            const movie = await saveMovie(movieId);
            setMovie(movie);
        } catch (err) {
            if ((err as { message: string }).message == "Resource not found!") {
                navigate(`404`);
                return;
            }
            return;
        }
    }
    async function onUnsave() {
        try {
            const movie = await unsaveMovie(movieId);
            setMovie(movie);
        } catch (err) {
            if ((err as { message: string }).message == "Resource not found!") {
                navigate(`404`);
                return;
            }
            return;
        }
    }
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
                            <i className="fa-solid fa-thumbs-up" onClick={onUnlike}></i>
                            <p>{likes.length}</p>
                        </div>
                        : <div>
                            <i className="fa-regular fa-thumbs-up" onClick={onLike}></i>
                            <p>{likes.length}</p>
                        </div>
                    }
                    {savesIds.includes(user._id)
                        ? <div>
                            <i className="fa-solid fa-bookmark" onClick={onUnsave}></i>
                            <p>{saves.length}</p>
                        </div>
                        : <div>
                            <i className="fa-regular fa-bookmark" onClick={onSave}></i>
                            <p>{saves.length}</p>
                        </div>
                    }
                </article>
            }
        </>
    )
}