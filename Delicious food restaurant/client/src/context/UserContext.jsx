import { createContext, useEffect, useState } from "react";
import { deleteUserData, getUserData, setUserData } from "../utils/userHelper";
import { logout } from "../api/userService";

const userContext = createContext();

export default function UserContext(props) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userData = getUserData();
        if (userData) {
            setUser(userData);
        }
    },[])

    async function setUserHandler(user) {
        setUserData(user);
        setUser(user);
    }

    async function clearUserHandler(){
        await logout();
        deleteUserData();
        setUser(null);
    }

    return (
        <userContext.Provider value={ {user,setUserHandler,clearUserHandler}}>
            {props.children}
        </userContext.Provider>
    )
}