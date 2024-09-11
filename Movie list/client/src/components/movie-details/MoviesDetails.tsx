import { Link, useParams } from "react-router-dom"

import { useGetOneMovie } from "../../hooks/useMovies";
import { useUserContext } from "../../context/userContext";

import errorStyles from "../status404/Status404.module.css";
import styles from "./MovieDetails.module.css";

import { onImageError } from "../../utils/imageError";
import MovieDetailsButtons from "./movie-details-buttons/MovieDetailsButtons";
import MovieDetailsCommentSection from "./movie-details-comment-section/MovieDetailsCommentSection";

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
                ? <>
                    <div className={styles.detailsWrapper}>
                        <h1>{(movie as { title: string }).title}</h1>
                        <img src={(movie as { image: string }).image} alt={(movie as { title: string }).title} onError={onImageError} />
                        <div>
                            <p>Genre: {(movie as { genre: string }).genre}</p>
                            <p>Year: {(movie as { year: number }).year}</p>
                        </div>
                        <p>{(movie as { description: string }).description}</p>
                        <div>
                            {user
                                ? <MovieDetailsButtons
                                    user={user}
                                    ownerId={(movie as { ownerId: string }).ownerId}
                                    likes={(movie as { likes: [] }).likes}
                                    saves={(movie as { saves: [] }).saves}
                                    movieId={movieId}
                                />
                                : ""
                            }
                        </div>
                    </div>
                <MovieDetailsCommentSection
                        ownerId={(movie as { ownerId: string }).ownerId}
                        comments={(movie as {comments:[]}).comments}
                        />
                </>
                : <div className={errorStyles.wrapper}>
                    <h2>Movie cannot be loaded</h2>
                    <p>Please return to <Link to="/catalog">CATALOG</Link>.</p>
                </div>
            }
        </>
    )
}