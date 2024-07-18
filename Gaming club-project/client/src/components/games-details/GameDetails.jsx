import { useEffect, useState } from "react";
import styles from "./GameDetails.module.css"
import { useNavigate, useParams } from "react-router-dom"
import { getGameById } from "../../api/gameService";
import { getUserData } from "../../utils/userDataHelper";
import GameDetailsComments from "./games-details-comments/GameDetailsComments";
import GamesDetailsButtons from "./games-details-buttons/GamesDetailsButtons";

export default function GameDetails() {
    const [game, setGame] = useState({
        comments: [],
        userLikes: [],
        saves: []
    })
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    const { gameId } = useParams();
    let navigate = useNavigate();
    let userData = getUserData();

    useEffect(() => {
        (async () => {
            try {
                let game = await getGameById(gameId);
                setGame(game);
            } catch (err) {
                if (err.message == "Resource not found!") {
                    navigate("404");
                }
                return;
            }
        })()
    }, [])

    return (
        <>
            <div className={styles.details}>
                <h1>{game.name}</h1>
                <p>Published by: {game.creator}</p>
                <img src={game.image} alt={game.name} />
                <div className={styles.category}>
                    <p>Category: {game.category}</p>
                    <p>Year: {game.year}</p>
                    <p>Creator: {game.creator}</p>
                </div>
                <p>{game.description}</p>
                {userData
                    ?<GamesDetailsButtons
                    isLiked={isLiked}
                    isSaved={isSaved}
                    userData={userData}
                    ownerId={game.ownerId}
                    likes={game.likes}
                    saves={game.saves.length}
                    />
                :""
           }
            </div>
            <section className={styles.comments}>
                <details>
                    <summary>Comments:<span>{game.comments.length}</span></summary>
                    <div className={styles.commentContent}>
                        {userData
                            ? <form>
                                <textarea type="text" name="comment" placeholder="Enter comment..." />
                                <button><a href="/details/{{game._id}}/comment">Comment</a></button>
                            </form>
                            : ""}
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