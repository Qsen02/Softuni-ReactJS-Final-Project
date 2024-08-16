import { useState } from "react";
import { getUserData } from "../utils/userHelper";

export function usePresistedState(initalvalues) {
    const [user, setUser] = useState(() => {
        const userData = getUserData();
        if (userData) {
            return userData;
        }

        return typeof(initalvalues) === "function" ? initalvalues() : initalvalues;
    })

    function setUserHandler(value) {
        const newState = typeof(value) === "function" ? value(user) : value;
        setUser(newState);
    }

    return {
        user,
        setUserHandler
    }
}