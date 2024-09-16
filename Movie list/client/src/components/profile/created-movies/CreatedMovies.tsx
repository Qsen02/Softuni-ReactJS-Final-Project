import styles from "../ProfileMovies.module.css";
import { useNavigate } from "react-router-dom";
import CreatedMoviesDetails from "./created-movies-details/CreatedMoviesDetails";

type CreatedMoviesProps = {
    createdMovies: []
}

export default function CreatedMovies({
    createdMovies
}: CreatedMoviesProps) {
    const navigate=useNavigate();

    function onBack(){
        navigate("/profile");
    }

    return (
        <div className={styles.modal}>
            <button onClick={onBack}>X</button>
            <h1>Your created movies</h1>
            <section className={styles.catalogContent}>
                    {createdMovies.length > 0
                        ? createdMovies.map(el => <CreatedMoviesDetails
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