import { useEffect, useState } from "react";
import { addDishToCart, cancelOrder, findUserCart, orderDishes, removeDishFromCart } from "../api/cartService";

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
                if (!user) {
                    return;
                }
                const cart = await findUserCart(user._id);
                if (!cart) {
                    return;
                }
                const isAdded = cart.dishes.find(el => el._id == dishId);
                if (isAdded) {
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
    const [cart, setCart] = useState({ dishes: [] });

    useEffect(() => {
        (async() => {
            try {
                setLoading(true);
                const cart = await findUserCart(user._id);
                setCart(cart);
                setDishes(cart.dishes);
                setLoading(false);
            } catch (err) {
                if (err.message == "Resource not found!") {
                    navigate("/404");
                }
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
        cart,
        loading,
        setLoadingHandler,
        fetchFailed,
        setFetchFailedHandler
    }
}

export function useRemoveDishFromCart() {
    async function removingDishFromCart(dishId, cartId) {
        return await removeDishFromCart(dishId, cartId);
    }

    return removingDishFromCart;
}

export function useOrderDishes() {
    async function orderingDishes(cartId) {
        return await orderDishes(cartId);
    }

    return orderingDishes;
}

export function useCancelOrder() {
    async function cancelingOrder(cartId) {
        return await cancelOrder(cartId);
    }

    return cancelingOrder;
}