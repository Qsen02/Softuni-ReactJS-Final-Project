import { useUserContext } from "../../../context/UserContext"

import styles from "../DishLikes.module.css"

export default function DishLikesContent({
    username
}) {
    const { user } = useUserContext();

    return (
        <div className={username == user.username ? styles.yourLike : ""}>
            <i className="fa-solid fa-circle-user"></i>
            <p>{username}</p>
        </div>
    )
}