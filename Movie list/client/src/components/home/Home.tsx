import { useGetTopMovies } from "../../hooks/useMovies"
import HomeContent from "./home-content/HomeContent"
import styles from "./Home.module.css"

export default function Home() {
    const { movies} = useGetTopMovies([]);

    return (
        <>
            <div className={styles.homeHeader}>
                <h2>Welcome to movie list!</h2>
                <p>Here you can find most various movies!</p>
            </div>
            <div className={styles.homeBody}>
                <h2>Top 3 movies</h2>
                <div>
                    {movies.length > 0
                        ? movies.map(el => <HomeContent key={el._id} id={el._id} title={el.title} genre={el.genre} image={el.image}/>)
                        : <h2>No movies yet</h2>
                    }
                </div>
            </div>
        </>
    )
}