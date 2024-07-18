import { useEffect, useState } from "react";
import styles from "./GameDetails.module.css"
import { useNavigate, useParams } from "react-router-dom"
import { getGameById } from "../../api/gameService";
import { getUserData } from "../../utils/userDataHelper";
import GameDetailsComments from "./games-details-comments/GameDetailsComments";

export default function GameDetails() {
    let [game, setGame] = useState({
        comments:[],
        userLikes:[],
        saves:[]
    })
    let { gameId } = useParams();
    let navigate = useNavigate();
    let userData = getUserData();

    useEffect(() => {
        (async () => {
            try {
                let game = await getGameById(gameId);
                console.log(game);
                setGame(game);
            } catch (err) {
                if (err.message == "Resource not found!") {
                    navigate("404");
                }
                return;
            }
        })()
    },[])

    return (
        <>
            <div className={styles.details}>
                <h1>{game.name}</h1>
                <p>Published by: {userData.username}</p>
                <img src={game.image} alt={game.name} />
                <div className={styles.category}>
                    <p>Category: {game.category}</p>
                    <p>Year: {game.year}</p>
                    <p>Creator: {game.creator}</p>
                </div>
                <p>{game.description}</p>
                <div className={styles.likes}>
                    <i className="fa-solid fa-heart" id="creatorLikes"></i>
                    <p>{game.likes}</p>
                </div>
                <div className={styles.buttons}>
                    <button><a href="/games/edit/{{game._id}}">Edit</a></button>
                    <button className={styles.delete}><a href="/games/delete/{{game._id}}">Delete</a></button>
                </div>
                <div className={styles.saves}>
                    <i className="fa-solid fa-bookmark" id="owner-save"></i>
                    <p>{game.saves.length}</p>
                </div>
                <div className={styles.likes}>
                    <i className="fa-solid fa-heart" id="creatorLikes"></i>
                    <p>{game.likes}</p>
                </div>
                <div className={styles.likes}>
                    <a href="/games/{{game._id}}/like"><i className="fa-regular fa-heart"></i></a>
                    <p>{game.likes}</p>
                </div>
                <div className={styles.saves}>
                    <i className="fa-solid fa-bookmark" id="owner-save"></i>
                    <p>{game.saves.length}</p>
                </div>
                <div className={styles.saves}>
                    <a href="/games/{{game._id}}/save"><i className="fa-regular fa-bookmark"></i></a>
                    <p>{game.saves.length}</p>
                </div>
            </div>
            <section className={styles.comments}>
                <details>
                    <summary>Comments:<span></span></summary>
                    <div className={styles.commentContent}>
                        <button><a href="/details/{{game._id}}/comment">Comment</a></button>
                        {game.comments.length == 0
                            ? <h3>No comments yet, be the first one!</h3>
                            : game.comments.map(el =>
                                <GameDetailsComments
                                    key={el._id}
                                    commentId={el._id}
                                    content={el.content}
                                    username={el.username}
                                />
                            )
                        }
                    </div>
                </details>
            </section>
        </>

    )
}