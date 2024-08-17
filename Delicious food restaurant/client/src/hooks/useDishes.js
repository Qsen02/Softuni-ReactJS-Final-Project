import { useEffect, useReducer, useState } from "react";
import { getAllDishes, searchDishes } from "../api/dishesService";
import { reducer } from "../reducers/dishReducer";

export function useGetAllDishes(initialvalues) {
    const [dishes, dispatch] = useReducer(reducer, initialvalues);
    const [isFetchFailed, setIsFetchFailed] = useState(false);

    useEffect(() => {
        (async() => {
            try {
                const data = await getAllDishes();
                dispatch({ type: "getAll", payload: data });
            } catch (err) {
                setIsFetchFailed(true);
                return;
            }
        })()
    }, [])

    return {
        dishes,
        dispatch,
        isFetchFailed
    }
}

export function useSearch() {
    async function searching(query) {
        return await searchDishes(query);
    }

    return searching;
}