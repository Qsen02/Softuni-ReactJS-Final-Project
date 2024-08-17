import { useEffect, useReducer, useState } from "react";
import { getAllDishes } from "../api/dishesService";
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

    function setDishesHandler(value) {
        if (value instanceof Array) {
            dispatch({ type: "setValues", payload: value });
        }
    }

    return {
        dishes,
        setDishesHandler,
        isFetchFailed
    }
}