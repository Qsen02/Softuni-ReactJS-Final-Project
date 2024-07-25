import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { createGame, deleteGame, editGame, getAllGames, getGameById } from "../api/gameService";
import { getUserById } from "../api/userService";

export function useGetAllGames(initalvalues) {
    const [games, setGames] = useState(initalvalues);
    const [isLoading, setIsloading] = useState(false);

    function setGamesHanlder(games) {
        setGames(games);
    }

    function loadingHandler(bool) {
        if (typeof(bool) != "boolean") {
            return;
        }
        setIsloading(bool);
    }

    useEffect(() => {
        (async function getGames() {
            setIsloading(true);
            let data = await getAllGames();
            setGames(data);
            setIsloading(false);
        })()
    }, [])

    return {
        games,
        setGamesHanlder,
        isLoading,
        loadingHandler
    }
}

export function useGetOneGame(initailGameValues, initialOwnerValues, gameId) {
    const [game, setGame] = useState(initailGameValues)
    const [userOwner, setUserOwner] = useState(initialOwnerValues);
    const [isLoading, setIsloading] = useState(false);
    const navigate = useNavigate();

    function setGameHandler(game) {
        setGame(game);
    }

    function loading(bool) {
        if (typeof(bool) != "boolean") {
            return;
        }
        setIsloading(bool);
    }

    useEffect(() => {
        (async() => {
            try {
                setIsloading(true);
                const game = await getGameById(gameId);
                setGame(game);
                setIsloading(false);
                const user = await getUserById(game.ownerId);
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
        setGameHandler,
        isLoading,
        loading
    }
}

export function useCreateGame() {
    async function creatingGame(gameData) {
        await createGame(gameData);
    }
    return creatingGame;
}

export function useDeleteGame() {
    async function deletingGame(gameId) {
        await deleteGame(gameId);
    }

    return deletingGame;
}

export function useEditGame() {
    async function editingGame(gameId, gameData) {
        const game = await editGame(gameId, gameData);
        return game;
    }

    return editingGame;
}