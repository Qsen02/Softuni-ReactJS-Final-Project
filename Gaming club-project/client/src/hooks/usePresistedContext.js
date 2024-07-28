import { useState } from "react";
import { getUserData } from "../utils/userDataHelper";

export function usePresistedContext(initialvalues) {
    const [isUser, setIsUser] = useState(() => {
        const userData = getUserData();
        if (!userData) {
            return typeof(initialvalues) === "function" ? initialvalues() : initialvalues;
        }

        return userData;
    });

    function setUser(value) {
        const newState = typeof(value) === "function" ? value(isUser) : value;
        setIsUser(newState);
    }

    return {
        isUser,
        setUser
    }
}