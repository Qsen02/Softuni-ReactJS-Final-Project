import styles from "./GameDetails.module.css"

export default function GameDetails() {
    return (
        <>
            <div className={styles.details}>
                <h1></h1>
                <p>Published by: </p>
                <img src="{{game.image}}" alt="{{game.name}}" />
                <div className={styles.category}>
                    <p>Category: </p>
                    <p>Year: </p>
                    <p>Creator:</p>
                </div>
                <p></p>
                <div className={styles.likes}>
                    <i className="fa-solid fa-heart" id="creatorLikes"></i>
                    <p></p>
                </div>
                <div className={styles.buttons}>
                    <button><a href="/games/edit/{{game._id}}">Edit</a></button>
                    <button className={styles.delete}><a href="/games/delete/{{game._id}}">Delete</a></button>
                </div>
                <div className={styles.saves}>
                    <i className="fa-solid fa-bookmark" id="owner-save"></i>
                    <p></p>
                </div>
                <div className={styles.likes}>
                    <i className="fa-solid fa-heart" id="creatorLikes"></i>
                    <p></p>
                </div>
                <div className={styles.likes}>
                    <a href="/games/{{game._id}}/like"><i className="fa-regular fa-heart"></i></a>
                    <p></p>
                </div>
                <div className={styles.saves}>
                    <i className="fa-solid fa-bookmark" id="owner-save"></i>
                    <p></p>
                </div>
                <div className={styles.saves}>
                    <a href="/games/{{game._id}}/save"><i className="fa-regular fa-bookmark"></i></a>
                    <p></p>
                </div>
            </div>
            <section className={styles.comments}>
                <details>
                    <summary>Comments:<span></span></summary>
                    <div className={styles.commentContent}>
                        <button><a href="/details/{{game._id}}/comment">Comment</a></button>
                        <h3>No comments yet, be the first one!</h3>
                        <div className="your-comment">
                            <h3><span>@publisher</span></h3>
                            <a href="/comment/{{_id}}/edit"><i className="fa-solid fa-square-pen"></i></a>
                            <a href="/comment/{{_id}}/delete"><i className="fa-solid fa-trash"></i></a>
                            <p></p>
                        </div>
                    </div>
                </details>
            </section>
        </>

    )
}