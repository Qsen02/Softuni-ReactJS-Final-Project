import { useState, useEffect } from "react";
import { getAllGames, getGameById } from "../api/gameService";

export function useGames(initalvalues) {
    const [games, setGames] = useState(initalvalues);

    useEffect(() => {
        (async function getGames() {
            let data = await getAllGames();
            setGames(data);
        })()
    }, [])

    return {
        games,
        setGames
    }
}

export function useDetails(initailGameValues, initialOwnerValues, gameId) {
    const [game, setGame] = useState(initailGameValues)
    const [userOwner, setUserOwner] = useState(initialOwnerValues);

    useEffect(() => {
        (async() => {
            try {
                const game = await getGameById(gameId);
                setGame(game);
                const user = await getUserById(game.ownerId)
                setUserOwner(user);
            } catch (err) {
                if (err.message == "Resource not found!") {
                    navigate("404");
                }
                return;
            }
        })()
    }, [])

    return {
        game,
        userOwner,
        setGame
    }
}