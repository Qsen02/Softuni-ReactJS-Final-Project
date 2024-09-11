import { useParams } from "react-router-dom"
import { useGetOneMovie } from "../../hooks/useMovies";

import styles from "../logout/Logout.module.css";

export default function MovieDelete() {
    const { movieId } = useParams();
    const { movie } = useGetOneMovie({}, movieId);

    return (
        <div className={styles.modal}>
            <div>
                <h2>Are you sure you want to delete {(movie as { title: string }).title}?</h2>
                <button>Yes</button>
                <button>No</button>
            </div>
        </div>
    )
}