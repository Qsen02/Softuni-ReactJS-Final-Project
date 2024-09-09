import { createContext, useContext, useState } from "react";
import { logout } from "../api/userService";
import { clearUserData } from "../utils/userHelper";

const UserContext = createContext();

export default function UserContextProvider(props:React.Children) {
    type User = {
        _id: string,
        username: string,
        email: string,
        isAdmin: boolean
    } | null

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
    const {user,setUserState,clearUserState}=useContext(UserContext);

    return {
        user,setUserState,clearUserState
    }
}