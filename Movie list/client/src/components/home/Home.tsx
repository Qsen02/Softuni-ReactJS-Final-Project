import { useGetTopMovies } from "../../hooks/useMovies"
import HomeContent from "./home-content/HomeContent"
import styles from "./Home.module.css"

export default function Home() {
    const { movies, loading, fetchError } = useGetTopMovies([]);

    return (
        <>
            {loading && !fetchError
                ? <div className={styles.loadingSpinner}></div>
                : ""
            }
            <section className={styles.homeHeader}>
                <h2>Welcome to movie list!</h2>
                <p>Here you can find most various movies!</p>
            </section>
            <section className={styles.homeBody}>
                <h2>Top 3 movies</h2>
                {movies.length > 0 && !loading && !fetchError
                    ? movies.map(el => <HomeContent key={el._id} id={el._id} title={el.title} genre={el.genre} image={el.image} />)
                    : loading && !fetchError
                        ? <h2 className={styles.errorMessage}>Movies loading...</h2>
                        : fetchError
                            ? <h2 className={styles.errorMessage}>Movies cannot be loaded please try again later.</h2>
                            : <h2 className={styles.errorMessage}>No movies yet</h2>
                }
            </section>
        </>
    )
}