import { Link } from "react-router-dom";
import { onImageError } from "../../../../utils/imageError";

type CreatedMoviesDetailsProps={
    id:string,
    title:string,
    image:string,
    genre:string
}

export default function CreatedMoviesDetails({
    id,title,image,genre
}:CreatedMoviesDetailsProps){
    return (
        <article>
            <img src={image} alt={title} onError={onImageError}/>
            <h2>{title}</h2>
            <p>Genre: {genre}</p>
            <Link to={`/catalog/${id}`}><button>Details</button></Link>
        </article>
    )
}