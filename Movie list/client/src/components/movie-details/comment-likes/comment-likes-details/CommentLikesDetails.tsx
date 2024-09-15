import { useUserContext } from "../../../../context/userContext";
import { onProfileImageError } from "../../../../utils/imageError";

import styles from "../../movie-details-likes/MovieDetailsLikes.module.css";

type CommentLikesDetailsProps={
    userId:string,
    image:string,
    username:string
}

export default function CommentLikesDetails({
    userId,image,username
}:CommentLikesDetailsProps){
    const {user}=useUserContext();
    return (
        <article className={user?._id == userId ? styles.you : ""}>
            <img src={image} alt={username} onError={onProfileImageError}/>
            <p>{username}</p>
        </article>
    )
}