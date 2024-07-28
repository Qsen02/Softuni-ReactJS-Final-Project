import { createContext, useContext } from "react";

import { removeUserData } from "../utils/userDataHelper";
import { logout } from "../api/userService";
import { usePresistedContext } from "../hooks/usePresistedContext";

const UserContext = createContext();

export {
    UserContext
}

export default function UserContextProvider(props) {
    const {isUser, setUser} = usePresistedContext(null);

    function setUserHandler(user) {
        setUser(user);
    }

    async function clearUserHandler() {
        removeUserData();
        await logout();
        setUser(null);
    }

    return (
        <UserContext.Provider value={{ user: isUser, setUserHandler, clearUserHandler }}>
            {props.children}
        </UserContext.Provider>
    )
}

export function useUserContext() {
    const { user, setUserHandler, clearUserHandler } = useContext(UserContext);

    return {
        user,
        setUserHandler,
        clearUserHandler
    }
}