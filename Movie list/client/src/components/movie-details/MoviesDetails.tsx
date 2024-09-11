import { Link, Outlet, useParams } from "react-router-dom"

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
        <Outlet/>
            {loading && !fetchError
                ? <div className={styles.loadingSpinner}></div>
                : ""
            }
            {!fetchError
                ? <>
                    <section className={styles.detailsWrapper}>
                        <h1>{(movie as { title: string }).title}</h1>
                        <img src={(movie as { image: string }).image} alt={(movie as { title: string }).title} onError={onImageError} />
                        <article>
                            <p>Genre: {(movie as { genre: string }).genre}</p>
                            <p>Year: {(movie as { year: number }).year}</p>
                        </article>
                        <p>{(movie as { description: string }).description}</p>
                        <article>
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
                        </article>
                    </section>
                <MovieDetailsCommentSection
                        ownerId={(movie as { ownerId: string }).ownerId}
                        comments={(movie as {comments:[]}).comments}
                        />
                </>
                : <section className={errorStyles.wrapper}>
                    <h2>Movie cannot be loaded</h2>
                    <p>Please return to <Link to="/catalog">CATALOG</Link>.</p>
                </section>
            }
        </>
    )
}