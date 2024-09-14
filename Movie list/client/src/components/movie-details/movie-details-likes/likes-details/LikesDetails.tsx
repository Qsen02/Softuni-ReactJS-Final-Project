import { onProfileImageError } from "../../../../utils/imageError"

type LikesDetailsProps={
    username:string,
    image:string
}

export default function LikesDetails({
    username,image
}:LikesDetailsProps){
    return (
        <article>
            <img src={image} alt={username} onError={onProfileImageError}/>
            <p>{username}</p>
        </article>
    )
}