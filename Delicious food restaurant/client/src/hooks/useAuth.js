import { useEffect, useState } from "react";
import { getUserById, login, register } from "../api/userService";
import { useNavigate } from "react-router-dom";

export function useLogin() {
    async function logingin(data) {
        return await login(data);
    }

    return logingin;
}

export function useRegister() {
    async function registration(data) {
        return await register(data);
    }

    return registration;
}

export function useGetUser(initalvalues, userId) {
    const [curUser, setCurUser] = useState(initalvalues);
    const [loading, setLoading] = useState(false);
    const [fetchFailed, setFetchFailed] = useState(false);
    const [createdDishes, setCreatedDishes] = useState([]);
    const [allCreatedDishes, setAllCreatedDishes] = useState([]);
    const [maxPage, setMaxPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        (async() => {
            try {
                setLoading(true);
                const user = await getUserById(userId);
                if (user.createdDishes) {
                    setAllCreatedDishes(user.createdDishes)
                    const firstDishes = user.createdDishes.slice(0, 6);
                    setCreatedDishes(firstDishes);
                    setMaxPage(user.maxPage);
                }
                setCurUser(user);
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

    function setCreatedDishesHandler(value) {
        if (value instanceof Array) {
            setCreatedDishes(value);
        }
    }

    function setLoadingHandler(value) {
        if (typeof(value) === "boolean") {
            setLoading(value);
        }
    }

    return {
        curUser,
        loading,
        setLoadingHandler,
        fetchFailed,
        createdDishes,
        setCreatedDishesHandler,
        maxPage,
        allCreatedDishes
    }
}