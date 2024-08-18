import { useEffect, useReducer, useState } from "react";
import { createDish, getAllDishes, getDishById, searchDishes } from "../api/dishesService";
import { reducer } from "../reducers/dishReducer";
import { getUserById } from "../api/userService";

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

export function useGetOneDish(initialvalues, dishId) {
    const [dish, setDish] = useState(initialvalues)
    const [owner, setOwner] = useState(null);
    const [isFetchFailed, setIsFetchFailed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async() => {
            try {
                setIsLoading(true);
                const data = await getDishById(dishId);
                setDish(data);
                const owner = await getUserById(data.ownerId);
                setOwner(owner);
                setIsLoading(false);
            } catch (err) {
                setIsFetchFailed(true);
                return;
            }
        })()
    }, [dishId])

    function setDishHandler(value) {
        if (typeof(value) === "object" && value != null) {
            setDish(value);
        }
    }

    return {
        dish,
        setDishHandler,
        owner,
        isLoading,
        isFetchFailed
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