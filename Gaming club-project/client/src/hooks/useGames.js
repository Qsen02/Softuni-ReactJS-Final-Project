import { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";

import { createGame, deleteGame, editGame, getFirstGames, getGameById, getNextGames, likeGame, saveGame, unLikeGame, unsaveGame } from "../api/gameService";
import { getAuthorGames, getSavedGames, getUserById } from "../api/userService";

import { getUserData } from "../utils/userDataHelper";

import { gamesReducer } from "../reducers/gamesReducer";

export function useGetAllGames(initalvalues, params) {
    const [games, dispatch] = useReducer(gamesReducer, initalvalues);
    const [isLoading, setIsloading] = useState(false);
    const [maxPage, setMaxPage] = useState(1);

    function setGameHandler(data) {
        if (typeof(data) === "object" && data != null && data.type && typeof(data.type) === "string") {
            dispatch(data);
        }
    }

    function loadingHandler(bool) {
        if (typeof(bool) != "boolean") {
            return;
        }
        setIsloading(bool);
    }

    function setMaxPageHanlder(value) {
        if (typeof(value) != "number") {
            return;
        }
        setMaxPage(value);
    }

    useEffect(() => {
        (async() => {
            setIsloading(true);
            const data = await getFirstGames();
            setMaxPage(data.maxPage);
            dispatch({ type: "getAll", payload: data.games })
            setIsloading(false);
        })()
    }, [])

    return {
        games,
        setGameHandler,
        isLoading,
        loadingHandler,
        maxPage,
        setMaxPageHanlder,
    }
}

export function useGetOneGame(gameId) {
    const [game, setGame] = useState({
        name: "",
        year: "",
        category: "",
        creator: "",
        description: "",
        image: "",
        userLikes: [],
        saves: [],
        comments: []
    })
    const [userOwner, setUserOwner] = useState({});
    const [isLoading, setIsloading] = useState(false);
    const navigate = useNavigate();

    function setGameHandler(game) {
        if (typeof(game) != "object" && game != null) {
            return;
        }
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
    }, [gameId])

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

export function useLikeGame() {
    async function likingGame(gameId) {
        const game = await likeGame(gameId);
        return game;
    }

    return likingGame;
}

export function useUnlikeGame() {
    async function unlikingGame(gameId) {
        const game = await unLikeGame(gameId);
        return game;
    }

    return unlikingGame;
}

export function useSaveGame() {
    async function savingGame(gameId) {
        const game = await saveGame(gameId);
        return game;
    }

    return savingGame;
}

export function useUnsaveGame() {
    async function unsavingGame(gameId) {
        const game = await unsaveGame(gameId);
        return game;
    }

    return unsavingGame;
}

export function useProfile(initalUser, initalCreatedGames, initalSavedGames) {
    const [userData, setUserData] = useState(initalUser);
    const [createdGames, setCreatedGames] = useState(initalCreatedGames);
    const [savedGames, setSavedGames] = useState(initalSavedGames);
    const [isLoading, setIsloading] = useState(false);

    useEffect(() => {
        (async() => {
            setIsloading(true);
            const user = getUserData();
            setUserData(user);
            const createGames = await getAuthorGames(user._id);
            setCreatedGames(createGames);
            const saveGames = await getSavedGames(user._id);
            setSavedGames(saveGames);
            setIsloading(false);
        })()
    }, [])

    return {
        userData,
        createdGames,
        savedGames,
        isLoading
    };
}

export function useGetNextGames() {
    async function getingNextGames(page) {
        const data = await getNextGames(page);
        return data;
    }
    return getingNextGames;
}