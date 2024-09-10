import { Link, useParams } from "react-router-dom"

import { useGetOneMovie } from "../../hooks/useMovies";
import { useUserContext } from "../../context/userContext";

import errorStyles from "../status404/Status404.module.css";

import { onImageError } from "../../utils/imageError";

export default function MovieDetails() {
    const { movieId } = useParams();
    const { user } = useUserContext();
    const { movie, setMovie, loading, setLoading, fetchError, setFetchError } = useGetOneMovie({ likes: [], saves: [], comments: [] }, movieId);
    return (
        <>
            {loading && !fetchError
                ? <div></div>
                : ""
            }
            {!fetchError
                ? <div>
                    <h1>{(movie as { title: string }).title}</h1>
                    <img src={(movie as { image: string }).image} alt={(movie as { title: string }).title} onError={onImageError}/>
                    <p>Genre: {(movie as { genre: string }).genre}</p>
                    <p>Year: {(movie as { year: number }).year}</p>
                    <p>{(movie as { description: string }).description}</p>
                </div>
                : <div className={errorStyles.wrapper}>
                    <h2>Movie cannot be loaded</h2>
                    <p>Please return to <Link to="/catalog">CATALOG</Link>.</p>
                </div>
            }
        </>
    )
}