import styles from ".././GameDetails.module.css"

export default function GamesDetailsButtons({
    isLiked,
    isSaved,
    ownerId,
    userData,
    likes,
    saves
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
                    <button><a href="/games/edit/{{game._id}}">Edit</a></button>
                    <button className={styles.delete}><a href="/games/delete/{{game._id}}">Delete</a></button>
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
                        <a href="/games/{{game._id}}/like"><i className="fa-regular fa-heart"></i></a>
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
                        <a href="/games/{{game._id}}/save"><i className="fa-regular fa-bookmark"></i></a>
                        <p>{saves}</p>
                    </div>
                : ""
            }
        </>
    )
}