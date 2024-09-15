import LikedMoviesDetails from "./liked-movies-details/LikedMoviesDetails";

import styles from "../ProfileMovies.module.css"

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
    return (
        <div className={styles.modal}>
            <section className={styles.catalogContent}>
                    <h1>Your liked movies</h1>
                    {likedMovies.length > 0
                        ? likedMovies.map(el => <LikedMoviesDetails key={el._id} id={el._id} title={el.title} image={el.image} genre={el.genre} />)
                        : <h2>No liked movies yet</h2>
                    }
            </section>
        </div>
    )
}