import { useUserContext } from "../../../../context/userContext";

import { onProfileImageError } from "../../../../utils/imageError";

import styles from "../MovieDetailsLikes.module.css";

type LikesDetailsProps = {
    userId: string,
    username: string,
    image: string
}

export default function LikesDetails({
    userId, username, image
}: LikesDetailsProps) {
    const { user } = useUserContext();
    return (
        <article className={user?._id == userId ? styles.you : ""}>
            <img src={image} alt={username} onError={onProfileImageError} />
            <p>{username}</p>
        </article>
    )
}