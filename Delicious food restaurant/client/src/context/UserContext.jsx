import { createContext, useContext } from "react";

import { deleteUserData, setUserData } from "../utils/userHelper";

import { usePresistedState } from "../hooks/usePresistedState";
import { logout } from "../api/userService";

const userContext = createContext();

export default function UserContext(props) {
    const { user, setUserHandler } = usePresistedState(null);

    function setUseDatarHandler(user) {
        setUserData(user);
        setUserHandler(user);
    }

    async function clearUserHandler() {
        await logout();
        deleteUserData();
        setUserHandler(null);
    }

    return (
        <userContext.Provider value={{ user, setUserHandler: setUseDatarHandler, clearUserHandler }}>
            {props.children}
        </userContext.Provider>
    )
}

export function useUserContext() {
    const { user, setUserHandler, clearUserHandler } = useContext(userContext);

    return {
        user, setUserHandler, clearUserHandler
    }
}