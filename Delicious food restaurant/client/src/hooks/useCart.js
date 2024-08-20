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