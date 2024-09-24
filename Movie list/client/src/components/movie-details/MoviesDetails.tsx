import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { FormikHelpers } from "formik";

import { useGetOneMovie } from "../../hooks/useMovies";
import { useUserContext } from "../../context/userContext";
import { useCreateComment } from "../../hooks/useComments";

import errorStyles from "../status404/Status404.module.css";
import styles from "./MovieDetails.module.css";

import { onImageError } from "../../utils/imageError";

import MovieDetailsButtons from "./movie-details-buttons/MovieDetailsButtons";
import MovieDetailsCommentSection from "./movie-details-comment-section/MovieDetailsCommentSection";
import MovieDelete from "../movie-delete/MovieDelete";
import MovieEdit from "../movie-edit/MovieEdit";
import MovieDetailsLikes from "./movie-details-likes/MovieDetailsLikes";
import MovieDetailsSaves from "./movie-details-saves/MovieDetailsSaves";
import CommentDelete from "./comment-delete/CommentDelete";
import CommentEdit from "./comment-edit/CommentEdit";
import CommentLikes from "./comment-likes/CommentLikes";
import AdminGuard from "../../commons/AdminGuard";
import UserGuard from "../../commons/UserGuard";
import CommentAnswers from "./comment-answers/CommentAnswers";

export default function MovieDetails() {
    const { movieId } = useParams();
    const { user } = useUserContext();
    const { movie, setMovie, loading, setLoading, fetchError } = useGetOneMovie({ likes: [], saves: [], comments: [] }, movieId);
    const [errMsg, setErrMsg] = useState("");
    const createComment = useCreateComment();
    const navigate = useNavigate();

    async function onCreateComment(values: { content: string }, actions: FormikHelpers<{ content: string }>) {
        const content = values.content;
        try {
            if (!content) {
                throw new Error("Please, fill the field!");
            }
            setErrMsg("");
            setLoading(true);
            const movie = await createComment(movieId, { username: user?.username, content });
            setMovie(movie);
            actions.resetForm();
            setLoading(false);
        } catch (err) {
            if ((err as { message: string }).message == "Resource not found!") {
                navigate("/404");
                return;
            }
            setErrMsg((err as { message: string }).message);
            return;
        }
    }

    return (
        <>
            <Routes>
                <Route element={<AdminGuard />}>
                    <Route path="delete" element={<MovieDelete curMovie={movie} />} />
                    <Route path="edit" element={<MovieEdit setMovie={setMovie} curMovie={movie} />} />
                </Route>
                <Route element={<UserGuard />}>
                    <Route path="likes" element={<MovieDetailsLikes curMovie={movie} />} />
                    <Route path="saves" element={<MovieDetailsSaves curMovie={movie} />} />
                    <Route path="comment/:commentId/delete" element={<CommentDelete setMovie={setMovie} />} />
                    <Route path="comment/:commentId/edit" element={<CommentEdit setMovie={setMovie} />} />
                    <Route path="comment/:commentId/likes" element={<CommentLikes />} />
                    <Route path="comment/:commentId/answers" element={<CommentAnswers/>}/>
                </Route>
            </Routes>
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
                                    setMovie={setMovie}
                                    likes={(movie as { likes: [] }).likes}
                                    saves={(movie as { saves: [] }).saves}
                                    movie={movie}
                                />
                                : ""
                            }
                        </article>
                    </section>
                    <MovieDetailsCommentSection
                        ownerId={(movie as { ownerId: string }).ownerId}
                        comments={(movie as { comments: [] }).comments}
                        onCreateComment={onCreateComment}
                        errMsg={errMsg}
                        movieId={movieId}
                        setMovie={setMovie}
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