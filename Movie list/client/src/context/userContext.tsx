import { createContext, useContext, useState } from "react";
import { logout } from "../api/userService";
import { clearUserData } from "../utils/userHelper";

type User = {
    _id: string,
    username: string,
    email: string,
    isAdmin: boolean
} | null

type UserContextType ={
    user: User;
    setUserState: (user: User) => void;
    clearUserState: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export default function UserContextProvider(props:{children:React.ReactNode}) {

    const [user, setUser] = useState<User>(null);

    function setUserState(user: User) {
        setUser(user);
    }

    async function clearUserState(){
        await logout();
        clearUserData();
        setUser(null);
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