import LikedMoviesDetails from "./liked-movies-details/LikedMoviesDetails";

import styles from "../ProfileMovies.module.css"

import { useNavigate } from "react-router-dom";

type LikedMoviesProps = {
    likedMovies: []
}

export default function LikedMovies({
    likedMovies
}: LikedMoviesProps) {
    const navigate = useNavigate();

    function onBack() {
        navigate("/profile");
    }

    return (
        <>
            <div className={styles.modal}>
                <button onClick={onBack}>X</button>
                <h1>Your liked movies</h1>
                <section className={styles.catalogContent}>
                    {likedMovies.length > 0
                        ? likedMovies.map(el => <LikedMoviesDetails
                            key={(el as { _id: string })._id}
                            id={(el as { _id: string })._id}
                            title={(el as { title: string }).title}
                            image={(el as { image: string }).image}
                            genre={(el as { genre: string }).genre}
                        />)
                        : <h2>No liked movies yet</h2>
                    }
                </section>
            </div>
        </>
    )
}