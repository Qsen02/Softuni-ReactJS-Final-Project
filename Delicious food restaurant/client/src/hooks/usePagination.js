import { useState } from "react";

import { useGetNextDishes } from "./useDishes";

export function usePagination(isSearched, maxPage, setDishesHandler, loadingHandler, searchedResults, setSearchedResults) {
    const [page, setPage] = useState(0);
    const getNextDishes = useGetNextDishes();

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
            const data = await getNextDishes(page);
            setDishesHandler({ type: "pagination", payload: data.dishes });
        } else {
            const curResults = [...searchedResults];
            const dishes = [];
            for (let i = 0; i < maxPage; i++) {
                const curDishes = [];
                for (let j = 0; j < 6; j++) {
                    const dish = curResults.shift();
                    if (dish == undefined) {
                        break;
                    }
                    curDishes.push(dish);
                }
                dishes.push(curDishes);
            }
            setDishesHandler({ type: "pagination", payload: dishes[page] });
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

export function useProfilePagination(maxPage, setDishesHandler, loadingHandler, allDishes) {
    const [page, setPage] = useState(0);

    function profilePaginationHandler(page) {
        setPage(page);
        if (allDishes.length > 0) {
            loadingHandler(true);
            const curResults = [...allDishes];
            const dishes = [];
            for (let i = 0; i < maxPage; i++) {
                const curDishes = [];
                for (let j = 0; j < 6; j++) {
                    const dish = curResults.shift();
                    if (dish == undefined) {
                        break;
                    }
                    curDishes.push(dish);
                }
                dishes.push(curDishes);
            }
            setDishesHandler(dishes[page]);
            loadingHandler(false);
        }
    }

    return {
        page,
        profilePaginationHandler
    }

}