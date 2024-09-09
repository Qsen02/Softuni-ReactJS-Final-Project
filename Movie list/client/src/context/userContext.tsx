import { createContext, useContext } from "react";
import { logout } from "../api/userService";
import { clearUserData } from "../utils/userHelper";
import { usePresistedState } from "../hooks/usePresistedState";

type User = {
    _id: string,
    username: string,
    email: string,
    isAdmin: boolean,
    accessToken:string
} | null

type UserContextType ={
    user: User | null;
    setUserState: (user: User) => void;
    clearUserState: () => Promise<void>;
}

const UserContext = createContext<UserContextType | null>(null);

export default function UserContextProvider(props:{children:React.ReactNode}) {

    const {user, setUserData} = usePresistedState(null);

    function setUserState(user: User) {
        setUserData(user);
    }

    async function clearUserState(){
        await logout();
        clearUserData();
        setUserData(null);
    }

    return (
        <UserContext.Provider value={{user,setUserState,clearUserState}}>
            {props.children}
        </UserContext.Provider>
    )
}

export function useUserContext(){
    const context=useContext(UserContext);

    return {
        user:context?.user,
        setUserState:context?.setUserState,
        clearUserState:context?.clearUserState
    }
}