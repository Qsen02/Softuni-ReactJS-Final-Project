import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"

import styles from ".././GameDetails.module.css"

import { LikesAndSavesContext } from "../../../context/LikesAndSaveContext"

import { useLikeGame, useSaveGame, useUnlikeGame, useUnsaveGame } from "../../../hooks/useGames";
import { useUserContext } from "../../../context/userContext";

export default function GamesDetailsButtons({
    ownerId,
    likes,
    savesCount,
    gameId
}) {
    const navigate = useNavigate();
    const { userData, saves, likesArray, setGameHandler } = useContext(LikesAndSavesContext);
    const likeGame = useLikeGame();
    const unLikeGame = useUnlikeGame();
    const saveGame = useSaveGame();
    const unsaveGame = useUnsaveGame();
    const {clearUserHandler}=useUserContext();

    async function onLike() {
        try {
            const data = await likeGame(gameId);
            setGameHandler(data);
        } catch (err) {
            if(err.message=="You dont't have credentials, please login or register!"){
                clearUserHandler();
                return;
            }
            if (err.message == "Resource not found!") {
                navigate("/404");
                return;
            }
            return;
        }
    }

    async function onUnlike() {
        try {
            const data = await unLikeGame(gameId);
            setGameHandler(data);
        } catch (err) {
            if(err.message=="You dont't have credentials, please login or register!"){
                clearUserHandler();
                return;
            }
            if (err.message == "Resource not found!") {
                navigate("/404");
                return;
            }
            return;
        }
    }

    async function onSave() {
        try {
            const data = await saveGame(gameId);
            setGameHandler(data);
        } catch (err) {
            if(err.message=="You dont't have credentials, please login or register!"){
                clearUserHandler();
                return;
            }
            if (err.message == "Resource not found!") {
                navigate("/404");
                return;
            }
            return;
        }
    }

    async function onUnsave() {
        try {
            const data = await unsaveGame(gameId);
            setGameHandler(data);
        } catch (err) {
            if(err.message=="You dont't have credentials, please login or register!"){
                clearUserHandler();
                return;
            }
            if (err.message == "Resource not found!") {
                navigate("/404");
                return;
            }
            return;
        }
    }

    return (
        <>
            {userData._id.toString() == ownerId
                ? <div className={styles.ownerLike}>
                    <i className="fa-solid fa-heart"></i>
                    <p>{likes}</p>
                </div>
                : ""
            }
            {userData._id.toString() == ownerId
                ? <div className={styles.buttons}>
                    <button><Link to="edit">Edit</Link></button>
                    <button className={styles.delete}><Link to="delete">Delete</Link></button>
                </div>
                : ""
            }
            {userData._id.toString() == ownerId
                ? <div className={styles.ownerSave}>
                    <i className="fa-solid fa-bookmark" id="owner-save"></i>
                    <p>{savesCount}</p>
                </div>
                : ""
            }
            {userData._id.toString() != ownerId
                ? likesArray.includes(userData._id.toString())
                    ? <div className={styles.liked}>
                        <i className="fa-solid fa-heart" onClick={onUnlike}></i>
                        <p>{likes}</p>
                    </div>
                    : <div className={styles.likes}>
                        <i className="fa-regular fa-heart" onClick={onLike}></i>
                        <p>{likes}</p>
                    </div>
                : ""
            }
            {userData._id.toString() != ownerId
                ? saves.includes(userData._id.toString()) ? <div className={styles.saves}>
                    <i className="fa-solid fa-bookmark" onClick={onUnsave}></i>
                    <p>{savesCount}</p>
                </div>
                    : <div className={styles.saves}>
                        <i className="fa-regular fa-bookmark" onClick={onSave}></i>
                        <p>{savesCount}</p>
                    </div>
                : ""
            }
        </>
    )
}