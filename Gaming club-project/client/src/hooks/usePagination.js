import { useState } from "react";
import { useGetNextGames } from "./useGames";

export function usePagination(isSearched, maxPage, setGameHandler, loadingHandler, searchedResults, setSearchedResults) {
    const [page, setPage] = useState(0);
    const getNextGames = useGetNextGames();

    function setPageHandler(value) {
        if (typeof(value) != "number") {
            return;
        }
        setPage(value);
    }

    async function paginationHandler(page) {
        setPage(oldvalue => page);
        loadingHandler(true);
        if (!isSearched) {
            const data = await getNextGames(page);
            setGameHandler({ type: "getNext", payload: data.games });
        } else {
            const curResults = [...searchedResults];
            const games = [];
            for (let i = 0; i < maxPage; i++) {
                const curGames = [];
                for (let j = 0; j < 3; j++) {
                    const game = curResults.shift();
                    if (game == undefined) {
                        break;
                    }
                    curGames.push(game);
                }
                games.push(curGames);
            }
            setGameHandler({ type: "getNext", payload: games[page] });
            setSearchedResults(oldvalue => [...searchedResults]);
        }
        loadingHandler(false);
    }

    return {
        paginationHandler,
        page,
        setPageHandler
    }
}