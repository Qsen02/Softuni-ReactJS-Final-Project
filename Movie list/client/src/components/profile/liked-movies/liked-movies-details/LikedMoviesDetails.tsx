import { Link } from "react-router-dom";
import { onImageError } from "../../../../utils/imageError";

type LikedMoviesDetailsProps={
    id:string,
    title:string,
    image:string,
    genre:string
}

export default function LikedMoviesDetails({
    id,title,image,genre
}:LikedMoviesDetailsProps){
    return (
        <article>
            <img src={image} alt={title} onError={onImageError}/>
            <h2>{title}</h2>
            <p>Genre: {genre}</p>
            <Link to={`/catalog/${id}`}><button>Details</button></Link>
        </article>
    )
}