import { useEffect, useState } from "react";
import { addDishToCart, findUserCart } from "../api/cartService";

export function useGetUserCart() {
    async function gettingCart() {
        return await findUserCart();
    }

    return gettingCart;
}

export function useAddToCart() {
    async function addingToCart(cartId, data) {
        return await addDishToCart(cartId, data);
    }

    return addingToCart;
}

export function useIsAddedToCart(initalValues, user, dishId) {
    const [isAdded, setIsAdded] = useState(initalValues);

    useEffect(() => {
        (async() => {
            try {
                const cart = await findUserCart(user._id);
                if (!cart.dishes) {
                    return;
                }
                const dishesIds = cart.dishes.map(el => el.toString());
                if (dishesIds.includes(dishId.toString())) {
                    setIsAdded(true);
                } else {
                    setIsAdded(false);
                }
            } catch (err) {
                alert(err.message);
                return;
            }
        })()
    }, [])

    function setIsAddedHandler(value) {
        if (typeof(value) === "boolean") {
            setIsAdded(value);
        }
    }

    return {
        isAdded,
        setIsAddedHandler
    }
}

export function useGetDishesFromCart(initalvalues, user) {
    const [dishes, setDishes] = useState(initalvalues);
    const [loading, setLoading] = useState(false);
    const [fetchFailed, setFetchFailed] = useState(false);

    useEffect(() => {
        (async() => {
            try {
                setLoading(true);
                const cart = await findUserCart(user._id);
                setDishes(cart.dishes);
                setLoading(false);
            } catch (err) {
                setFetchFailed(true);
                return;
            }
        })()
    }, [])

    function setDishesHandler(value) {
        if (value instanceof Array) {
            setDishes(value);
        }
    }

    function setFetchFailedHandler(value) {
        if (typeof(value) === "boolean") {
            setFetchFailed(value);
        }
    }

    function setLoadingHandler(value) {
        if (typeof(value) === "boolean") {
            setLoading(value);
        }
    }

    return {
        dishes,
        setDishesHandler,
        loading,
        setLoadingHandler,
        fetchFailed,
        setFetchFailedHandler
    }
}