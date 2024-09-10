import { useParams } from "react-router-dom"
import { useGetOneMovie } from "../../hooks/useMovies";

export default function MovieDetails(){
    const {movieId}=useParams();
    const {movie,setMovie,loading,setLoading,fetchError,setFetchError}=useGetOneMovie({ likes: [], saves: [], comments: [] },movieId);
    return (
        <></>
    )
}