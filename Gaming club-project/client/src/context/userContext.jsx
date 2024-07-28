import { createContext, useContext, useEffect, useState } from "react";

import { getUserData, removeUserData } from "../utils/userDataHelper";
import { logout } from "../api/userService";

const UserContext = createContext();

export {
    UserContext
}

export default function UserContextProvider(props) {
    const [isUser, setIsUser] = useState(null);
    const user = getUserData();

    useEffect(() => {
        if (user) {
            setIsUser(user);
        } else {
            setIsUser(null);
        }
    }, [])

    function setUserHandler(user) {
        setIsUser(user);
    }

    async function clearUserHandler() {
        removeUserData();
        await logout();
        setIsUser(null);
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