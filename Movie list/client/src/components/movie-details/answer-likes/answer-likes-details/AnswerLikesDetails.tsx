import { useUserContext } from "../../../../context/userContext"
import { onProfileImageError } from "../../../../utils/imageError"

import styles from "../../movie-details-likes/MovieDetailsLikes.module.css"

type AnswerLikesDetailsProps = {
    profileImage: string,
    username: string,
    userId: string,
}

export default function AnswerLikesDetails({
    userId, profileImage, username
}: AnswerLikesDetailsProps) {
    const { user } = useUserContext();
    return (
        <article className={user?._id == userId ? styles.you : ""}>
            <img src={profileImage} alt={username} onError={onProfileImageError} />
            <p>{username}</p>
        </article>
    )
}