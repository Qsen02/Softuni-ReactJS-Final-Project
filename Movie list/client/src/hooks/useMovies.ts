import { useEffect } from "react";
import { useState } from "react";
import { createMovie, deleteMovie, editMovie, getAllMovies, getMovieById, getTopMovies, likeMovie, saveMovie, searchMovies, unlikeMovie, unsaveMovie } from "../api/movieService";
import { useNavigate } from "react-router-dom";

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
    const navigate=useNavigate();

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const movie = await getMovieById(movieId);
                setMovie(movie);
                setLoading(false);
            } catch (err) {
                if((err as {message:string}).message=="Resource not found!"){
                    navigate(`404`);
                    return;
                }
                setFetchError(true);
                return;
            }
        })()
    },[])

    return{
        movie,setMovie,loading,setLoading,fetchError,setFetchError
    }
}

export function useCreateMovie(){
    async function creatingMovie(data:{}){
        return await createMovie(data);
    }

    return creatingMovie;
}

export function useDeleteMovie(){
    async function deletingMovie(id:string|undefined){
        return await deleteMovie(id);
    }

    return deletingMovie;
}

export function useEditMovie(){
    async function editingMovie(id:string|undefined,data:{}){
        return await editMovie(id,data);
    }

    return editingMovie;
}

export function useLikeMovie(){
    async function likingMovie(data:{}){
        return await likeMovie(data);
    }

    return likingMovie;
}

export function useUnlikeMovie(){
    async function unlikingMovie(data:{}){
        return await unlikeMovie(data);
    }

    return unlikingMovie;
}

export function useSaveMovie(){
    async function savingMovie(data:{}){
        return await saveMovie(data);
    }

    return savingMovie;
}

export function useUnsaveMovie(){
    async function unsavingMovie(data:{}){
        return await unsaveMovie(data);
    }

    return unsavingMovie;
}
