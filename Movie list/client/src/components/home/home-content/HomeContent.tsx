import { Link } from "react-router-dom"
import { onImageError } from "../../../utils/imageError"

type HomeContentProps={
    id:string,
    title:string,
    genre:string,
    image:string
}

export default function HomeContent({
id,title,genre,image
}:HomeContentProps){
    return(
        <article>
            <img src={image} alt={title} onError={onImageError}/>
            <h2>{title}</h2>
            <p>Genre: {genre}</p>
            <Link to={`/catalog/${id}`}><button>Details</button></Link>
        </article>
    )
}