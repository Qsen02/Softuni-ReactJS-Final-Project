import { useContext, useState } from "react";
import { useParams, Route, Routes } from "react-router-dom"

import styles from "./GameDetails.module.css"

import GameDetailsComments from "./games-details-comments/GameDetailsComments";
import GamesDetailsButtons from "./games-details-buttons/GamesDetailsButtons";
import GameEdit from "../game-edit/GameEdit";
import GameDelete from "../game-delete/GameDelete";
import CommentDelete from "./comments-delete/CommentDelete";
import CommentEdit from "./comments-edit/CommentEdit";

import { useGetOneGame } from "../../hooks/useGames.js";
import {  useUserContext } from "../../context/userContext";

import { LikesAndSavesContext } from "../../context/LikesAndSaveContext";
import { useForm } from "../../hooks/useForm";
import { useCreateComment } from "../../hooks/useComments.js";

export default function GameDetails() {
    const initalGameValues = {
        comments: [],
        userLikes: [],
        saves: []
    };
    const initalOwnerValues = {};
    const { gameId } = useParams();
    const { user } = useUserContext();
    const createComment=useCreateComment();
    const { formValues, changeHandler, submitHandler } = useForm({ content: "" }, onComment);
    const { game, userOwner, setGameHandler,isLoading } = useGetOneGame(initalGameValues, initalOwnerValues, gameId);


    function onSetGameHandler(game) {
        setGameHandler(game);
    }

    async function onComment() {
        let content = formValues.content;
        try {
            if (!content) {
                throw new Error("Please fill the field!");
            }
            let data = await createComment(gameId, { content });
            setGameHandler(data);
        } catch (err) {
            alert(err.message);
            return;
        }
    }

    return (
        <>
            <Routes>
                <Route path="/delete" element={<GameDelete />} />
                <Route path="/edit" element={<GameEdit setCurGame={onSetGameHandler} />} />
                <Route path="comment/:commentId/delete" element={<CommentDelete setCurGame={onSetGameHandler} />} />
                <Route path="comment/:commentId/edit" element={<CommentEdit setCurGame={onSetGameHandler} />} />
            </Routes>
            {isLoading ?
                <div className={styles.loading}></div>
                : ""

            }
            <div className={styles.details}>
                <h1>{game.name}</h1>
                <p>Published by: {game.owner}</p>
                <img src={game.image} alt={game.name} />
                <div className={styles.category}>
                    <p>Category: {game.category}</p>
                    <p>Year: {game.year}</p>
                    <p>Creator: {game.creator}</p>
                </div>
                <p>{game.description}</p>
                {user
                    ?
                    <LikesAndSavesContext.Provider value={{ saves: game.saves, likesArray: game.userLikes, setGameHandler }}>
                        <GamesDetailsButtons
                            userData={user}
                            ownerId={game.ownerId}
                            likes={game.likes}
                            savesCount={game.saves.length}
                            gameId={game._id}
                        />
                    </LikesAndSavesContext.Provider>

                    : ""
                }
            </div>
            <section className={styles.comments}>
                <details>
                    <summary>Comments:<span>{game.comments.length}</span></summary>
                    <div className={styles.commentContent}>
                        {user
                            ? <form onSubmit={submitHandler}>
                                <input type="text" name="content" placeholder="Enter comment..." value={formValues.comment} onChange={changeHandler} />
                                <button type="submit">Comment</button>
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
                                    userData={user}
                                    ownerName={userOwner.username}
                                />
                            )
                        }
                    </div>
                </details>
            </section>
        </>

    )
}