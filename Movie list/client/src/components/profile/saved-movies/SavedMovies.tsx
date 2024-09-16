import styles from "../ProfileMovies.module.css";
import { useNavigate } from "react-router-dom";
import SavedMoviesDetails from "./saved-movies-details/SavedMoviesDetails";

type SavedMoviesProps = {
    savedMovies: []
}

export default function SavedMovies({
    savedMovies
}: SavedMoviesProps) {
    const navigate=useNavigate();

    function onBack(){
        navigate("/profile");
    }

    return (
        <div className={styles.modal}>
            <button onClick={onBack}>X</button>
            <h1>Your liked movies</h1>
            <section className={styles.catalogContent}>
                    {savedMovies.length > 0
                        ? savedMovies.map(el => <SavedMoviesDetails
                            key={(el as {_id:string})._id}
                            id={(el as {_id:string})._id}
                            title={(el as {title:string}).title}
                            image={(el as {image:string}).image}
                            genre={(el as {genre:string}).genre}
                            />)
                        : <h2>No liked movies yet</h2>
                    }
            </section>
        </div>
    )
}