import LikedMoviesDetails from "./liked-movies-details/LikedMoviesDetails";

import styles from "../ProfileMovies.module.css"
import { useNavigate } from "react-router-dom";

type LikedMoviesProps = {
    likedMovies: [
        {
            _id: string,
            title: string,
            image: string,
            genre: string
        }
    ]
}

export default function LikedMovies({
    likedMovies
}: LikedMoviesProps) {
    const navigate=useNavigate();

    function onBack(){
        navigate("/profile");
    }

    return (
        <div className={styles.modal}>
            <button onClick={onBack}>X</button>
            <h1>Your liked movies</h1>
            <section className={styles.catalogContent}>
                    {likedMovies.length > 0
                        ? likedMovies.map(el => <LikedMoviesDetails key={el._id} id={el._id} title={el.title} image={el.image} genre={el.genre} />)
                        : <h2>No liked movies yet</h2>
                    }
            </section>
        </div>
    )
}