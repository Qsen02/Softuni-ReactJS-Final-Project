import { useNavigate, useParams } from "react-router-dom"
import { useDeleteMovie } from "../../hooks/useMovies";

import styles from "../logout/Logout.module.css";

type MovieDeleteProps={
    curMovie:{}
}

export default function MovieDelete({
    curMovie
}:MovieDeleteProps) {
    const { movieId } = useParams();
    const navigate = useNavigate();
    const deleteMovie = useDeleteMovie();

    async function onDelete() {
        try {
            await deleteMovie(movieId);
            navigate("/catalog");
        } catch (err) {
            if ((err as { message: string }).message == "Resource not found!") {
                navigate(`404`);
                return;
            }
            return;
        }
    }

    async function onCancel(){
        try {
            navigate(`/catalog/${movieId}`);
        } catch (err) {
            if ((err as { message: string }).message == "Resource not found!") {
                navigate(`404`);
                return;
            }
            return;
        }
    }

    return (
        <div className={styles.modal}>
            <section>
                <h2>Are you sure you want to delete {(curMovie as { title: string }).title}?</h2>
                <button onClick={onDelete}>Yes</button>
                <button onClick={onCancel}>No</button>
            </section>
        </div>
    )
}