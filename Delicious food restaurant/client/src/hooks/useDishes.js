import { useEffect, useReducer, useState } from "react";
import { createDish, deleteDish, editDish, getAllDishes, getDishById, likeDish, searchDishes, unlikeDish } from "../api/dishesService";
import { reducer } from "../reducers/dishReducer";
import { useNavigate } from "react-router-dom";
import { getOrderById } from "../api/cartService";

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

    function setFetchFailedHandler(value) {
        if (typeof(value) === "boolean") {
            setIsFetchFailed(value);
        }
    }

    return {
        dishes,
        dispatch,
        isFetchFailed,
        setFetchFailedHandler,
        isLoading,
        setIsLoading
    }
}

export function useGetOneDish(initialvalues, dishId) {
    const [dish, setDish] = useState(initialvalues)
    const [isFetchFailed, setIsFetchFailed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        (async() => {
            try {
                setIsLoading(true);
                const data = await getDishById(dishId);
                setDish(data);
                setIsLoading(false);
            } catch (err) {
                if (err.message == "Resource not found!") {
                    navigate("/404");
                }
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
        isLoading,
        isFetchFailed,
        setIsFetchFailed
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

export function useLike() {
    async function liking(dishId) {
        return await likeDish(dishId);
    }

    return liking;
}

export function useUnlike() {
    async function unliking(dishId) {
        return await unlikeDish(dishId);
    }

    return unliking;
}

export function useDeleteDish() {
    async function deletingDish(dishId) {
        return await deleteDish(dishId);
    }

    return deletingDish;
}

export function useEditDish() {
    async function editingDish(dishId, data) {
        return await editDish(dishId, data);
    }

    return editingDish;
}

export function useGetDishesFromOrder(initialvalues, orderId) {
    const [dishes, setDishes] = useState(initialvalues);
    const [loading, setLoading] = useState(false);
    const [fetchFailed, setFetchFailed] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        (async() => {
            try {
                setLoading(true);
                const order = await getOrderById(orderId);
                setDishes(order.dishes);
                setTotalPrice(order.totalPrice);
                setLoading(false);
            } catch (err) {
                if (err.message == "Resource not found!") {
                    navigate("/404");
                    return;
                }
                setFetchFailed(true);
                return;
            }
        })()
    }, [])

    return {
        dishes,
        loading,
        fetchFailed,
        totalPrice
    }
}