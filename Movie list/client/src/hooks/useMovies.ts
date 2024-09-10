import { useEffect } from "react";
import { useState } from "react";
import { getAllMovies, getMovieById, getTopMovies, searchMovies } from "../api/movieService";

export function useGetTopMovies(initialvalues: []) {
    type CutomHookType = [
        {
            _id: string,
            title: string,
            genre: string,
            image: string
        }
    ] | []
    const [movies, setMovies] = useState<CutomHookType>(initialvalues);
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const movies: [] = await getTopMovies();
                setMovies(movies);
                setLoading(false);
            } catch (err) {
                setFetchError(true);
                return;
            }
        })()
    }, []);

    return {
        movies,
        loading,
        fetchError
    }
}

export function useGetAllMovies(initialvalues: []) {
    type CutomHookType = [
        {
            _id: string,
            title: string,
            genre: string,
            image: string
        }
    ] | []
    const [movies, setMovies] = useState<CutomHookType>(initialvalues);
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const movies = await getAllMovies();
                setMovies(movies);
                setLoading(false);
            } catch (err) {
                setFetchError(true);
                return;
            }
        })()
    }, [])

    return {
        movies, setMovies, loading, setLoading, fetchError, setFetchError
    }
}

export function useSearchMovies() {
    async function searchingMovies(query: string) {
        return await searchMovies(query);
    }

    return searchingMovies;
}

export function useGetOneMovie(initialvalues: {}, movieId: string|undefined) {
    type MovieType = {
        _id: string,
        title: string,
        genre: string,
        year: number,
        image: string,
        description: string,
        likes: [{}],
        comments: [{}],
        saves: [{}],
        ownerId: string
    }|{}
    const [movie, setMovie] = useState<MovieType>(initialvalues)
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const movie = await getMovieById(movieId);
                setMovie(movie);
                setLoading(false);
            } catch (err) {
                setFetchError(true);
                return;
            }
        })()
    },[movieId])

    return{
        movie,setMovie,loading,setLoading,fetchError,setFetchError
    }
}