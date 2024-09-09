import { useEffect } from "react";
import { useState } from "react";
import { getAllMovies, getTopMovies, searchMovies } from "../api/movieService";

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

    useEffect(() => {
        (async () => {
            try {
                const movies: [] = await getTopMovies();
                setMovies(movies);
            } catch (err) {
                alert((err as { message: string }).message);
                return;
            }
        })()
    }, []);

    return {
        movies
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

    useEffect(() => {
        (async () => {
            try {
                const movies = await getAllMovies();
                setMovies( movies );
            } catch (err) {
                alert((err as { message: string }).message);
                return;
            }
        })()
    }, [])

    return {
        movies,setMovies
    }
}

export function useSearchMovies(){
    async function searchingMovies(query:string){
        return await searchMovies(query);
    }

    return searchingMovies;
}