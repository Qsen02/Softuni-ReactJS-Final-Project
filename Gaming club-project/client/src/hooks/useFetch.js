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

export function useDetails(initailvalues, gameId) {
    let [game, setGame] = useState(initailvalues);

    useEffect(() => {
        (async() => {
            const data = await getGameById(gameId);
            setGame(data);
        })()
    })

    return {
        game
    }
}