import styles from ".././GameDetails.module.css"
import { Link } from "react-router-dom"

export default function GamesDetailsButtons({
    isLiked,
    isSaved,
    ownerId,
    userData,
    likes,
    saves,
    gameId
}) {
    return (
        <>
            {userData._id.toString() == ownerId
                ? <div className={styles.likes}>
                    <i className="fa-solid fa-heart" id="creatorLikes"></i>
                    <p>{likes}</p>
                </div>
                : ""
            }
            {userData._id.toString() == ownerId
                ? <div className={styles.buttons}>
                    <button><Link to={`/catalog/${gameId}/edit`}>Edit</Link></button>
                    <button className={styles.delete}><Link to={`/catalog/${gameId}/delete`}>Delete</Link></button>
                </div>
                : ""
            }
            {userData._id.toString() == ownerId
                ? <div className={styles.saves}>
                    <i className="fa-solid fa-bookmark" id="owner-save"></i>
                    <p>{saves}</p>
                </div>
                : ""
            }
            {userData._id.toString() != ownerId
                ? isLiked
                    ? <div className={styles.likes}>
                        <i className="fa-solid fa-heart" id="creatorLikes"></i>
                        <p>{likes}</p>
                    </div>
                    : <div className={styles.likes}>
                        <Link to={`/catalog/${gameId}/like`}><i className="fa-regular fa-heart"></i></Link>
                        <p>{likes}</p>
                    </div>
                : ""
            }
            {userData._id.toString() != ownerId
                ? isSaved ? <div className={styles.saves}>
                    <i className="fa-solid fa-bookmark" id="owner-save"></i>
                    <p>{saves}</p>
                </div>
                    : <div className={styles.saves}>
                        <Link to={`/catalog/${gameId}/save`}><i className="fa-regular fa-bookmark"></i></Link>
                        <p>{saves}</p>
                    </div>
                : ""
            }
        </>
    )
}