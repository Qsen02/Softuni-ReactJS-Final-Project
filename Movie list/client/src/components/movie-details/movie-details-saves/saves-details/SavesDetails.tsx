import { useUserContext } from "../../../../context/userContext";

import { onProfileImageError } from "../../../../utils/imageError";

import styles from "../../movie-details-likes/MovieDetailsLikes.module.css";

type SavesDetailsProps = {
    userId: string,
    username: string,
    image: string
}

export default function SavesDetails({
    userId, username, image
}: SavesDetailsProps) {
    const { user } = useUserContext();
    return (
        <article className={user?._id == userId ? styles.you : ""}>
            <img src={image} alt={username} onError={onProfileImageError} />
            <p>{username}</p>
        </article>
    )
}