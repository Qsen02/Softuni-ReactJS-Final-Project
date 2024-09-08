import { useEffect, useReducer } from "react";
import { useState } from "react";
import { getAllMovies, getTopMovies } from "../api/movieService";
import { catalogReducer } from "../reducers/catalogReducer";
import { string } from "yup";

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