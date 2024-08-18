import { useEffect, useReducer, useState } from "react";
import { createDish, getAllDishes, searchDishes } from "../api/dishesService";
import { reducer } from "../reducers/dishReducer";

export function useGetAllDishes(initialvalues) {
    const [dishes, dispatch] = useReducer(reducer, initialvalues);
    const [isFetchFailed, setIsFetchFailed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async() => {
            try {
                setIsLoading(true);
                const data = await getAllDishes();
                dispatch({ type: "getAll", payload: data });
                setIsLoading(false);
            } catch (err) {
                setIsFetchFailed(true);
                return;
            }
        })()
    }, [])

    return {
        dishes,
        dispatch,
        isFetchFailed,
        isLoading,
        setIsLoading
    }
}

export function useSearch() {
    async function searching(query) {
        return await searchDishes(query);
    }

    return searching;
}

export function useCreateDish() {
    async function creating(data) {
        return await createDish(data);
    }

    return creating;
}