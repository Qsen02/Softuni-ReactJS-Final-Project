import { createContext, useContext } from "react";
import { logout } from "../api/userService";
import { clearUserData, setUserData } from "../utils/userHelper";
import { usePresistedState } from "../hooks/usePresistedState";

type User = {
    _id: string,
    username: string,
    email: string,
    isAdmin: boolean,
    accessToken: string,
    profileImage: string
} | null

type UserContextType = {
    user: User | null;
    setUserState: (user: User) => void;
    clearUserState: () => Promise<void>;
}

const UserContext = createContext<UserContextType | null>(null);

export default function UserContextProvider(props: { children: React.ReactNode }) {

    const { user, setCurUser } = usePresistedState(null);

    function setUserState(user: User) {
        setCurUser(user);
        setUserData(user);
    }

    async function clearUserState() {
        await logout();
        clearUserData();
        setCurUser(null);
    }

    return (
        <UserContext.Provider value={{user, setUserState, clearUserState }}>
            {props.children}
        </UserContext.Provider>
    )
}

export function useUserContext() {
    const context = useContext(UserContext);

    return {
        user: context?.user,
        setUserState: context?.setUserState,
        clearUserState: context?.clearUserState
    }
}