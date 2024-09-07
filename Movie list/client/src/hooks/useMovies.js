import { useEffect } from "react";
import { useState } from "react";
import { getTopMovies } from "../api/movieService";

export function useGetTopMovies(initialvalues) {
    const [movies, setMovies] = useState(initialvalues);

    useEffect(() => {
        (async() => {
            try {
                const movies = await getTopMovies();
                setMovies(movies);
            } catch (err) {
                alert(err.message);
                return;
            }
        })()
    }, []);

    return {
        movies
    }
}