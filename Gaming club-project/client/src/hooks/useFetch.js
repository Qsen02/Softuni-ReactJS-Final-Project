import { useState, useEffect } from "react";
import { getAllGames, getGameById } from "../api/gameService";
import { useNavigate } from "react-router-dom";

export function useGames(initalvalues) {
    const [games, setGames] = useState(initalvalues);

    function setGamesHanlder(games) {
        setGames(games);
    }

    useEffect(() => {
        (async function getGames() {
            let data = await getAllGames();
            setGames(data);
        })()
    }, [])

    return {
        games,
        setGamesHanlder
    }
}

export function useDetails(initailGameValues, initialOwnerValues, gameId) {
    const [game, setGame] = useState(initailGameValues)
    const [userOwner, setUserOwner] = useState(initialOwnerValues);
    const navigate = useNavigate();

    function setGameHandler(game) {
        setGame(game);
    }

    useEffect(() => {
        (async() => {
            try {
                const game = await getGameById(gameId);
                setGame(game);
                const user = await getUserById(game.ownerId)
                setUserOwner(user);
            } catch (err) {
                if (err.message == "Resource not found!") {
                    navigate("/404");
                    return;
                }
                return;
            }
        })()
    }, [])

    return {
        game,
        userOwner,
        setGameHandler
    }
}