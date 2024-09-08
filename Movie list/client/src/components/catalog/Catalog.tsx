import { useGetAllMovies } from "../../hooks/useMovies"
import CatalogContent from "./catalog-content/CatalogContent";

export default function Catalog() {
    const { movies, setMovies } = useGetAllMovies([]);

    return (
        <>
            <form>
                <input type="text" name="title" placeholder="Search for movies..." />
                <button type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
            </form>
            <div>
                <h2>All available movies</h2>
                {movies.length > 0
                    ? movies.map(el => <CatalogContent key={el._id} id={el._id} title={el.title} genre={el.genre} image={el.image} />)
                    : <h2>No movies yet</h2>
                }
            </div>
        </>
    )
}