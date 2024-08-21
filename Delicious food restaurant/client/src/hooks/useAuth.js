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
    const navigate = useNavigate();

    useEffect(() => {
        (async() => {
            try {
                setLoading(true);
                const user = await getUserById(userId);
                setCurUser(user);
                setLoading(false);
            } catch (err) {
                if (err.message == "Resource font found!") {
                    navigate("/404");
                    return;
                }
                setFetchFailed(true);
                return;
            }
        })()
    }, [])

    function setCurUserHandler(value) {
        if (typeof(value) === "object" && value != null) {
            setCurUser(value);
        }
    }

    function setLoadingHandler(value) {
        if (typeof(value) === "boolean") {
            setLoading(value);
        }
    }

    function setFetchFailedHandler(value) {
        if (typeof(value) === "boolean") {
            setFetchFailed(value);
        }
    }

    return {
        curUser,
        setCurUserHandler,
        loading,
        setLoadingHandler,
        fetchFailed,
        setFetchFailedHandler
    }
}