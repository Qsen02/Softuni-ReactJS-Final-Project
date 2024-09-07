import { useEffect } from "react";
import { useState } from "react";
import { getTopMovies } from "../api/movieService";

export function useGetTopMovies(initialvalues:[]) {
    type CutomHookType=[
        {
            _id:string,
            title:string,
            genre:string,
            image:string
        }
    ]|[]
    const [movies, setMovies] = useState<CutomHookType>(initialvalues);

    useEffect(() => {
        (async() => {
            try {
                const movies:[] = await getTopMovies();
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