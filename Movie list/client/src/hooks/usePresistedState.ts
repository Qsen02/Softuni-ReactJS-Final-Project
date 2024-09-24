import { useState } from "react"
import { getUserData } from "../utils/userHelper"

type User = {
    _id: string,
    username: string,
    email: string,
    isAdmin: boolean,
    accessToken:string,
    profileImage:string
} | null

export function usePresistedState(initialvalues: User) {
    const [user, setUser] = useState(() => {
        const user = getUserData();
        if (user) {
            return user;
        }
        return initialvalues;
    })

    function setCurUser(value: User) {
        setUser(value);
    }

    return {
        user, setCurUser
    }
}