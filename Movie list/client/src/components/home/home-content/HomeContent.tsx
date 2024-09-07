import { Link } from "react-router-dom"

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
        <div>
            <img src={image} alt={title}/>
            <h2>{title}</h2>
            <p>Genre: {genre}</p>
            <Link to={`/catalog/${id}`}><button>Details</button></Link>
        </div>
    )
}