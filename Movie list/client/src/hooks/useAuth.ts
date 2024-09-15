import { useEffect, useState } from "react";
import { getUserById, login, resigter } from "../api/userService"
import { useNavigate } from "react-router-dom";

export function useLogin() {
    async function logingin(data: {}) {
        return await login(data);
    }

    return logingin
}

export function useRegister() {
    async function registration(data: {}) {
        return await resigter(data);
    }

    return registration;
}

type getUserHookParams = {
    savedMovies: [],
    createdMovies: [],
    likedMovies: [],
    profileImage:"",
    username:"",
    email:"",
    isAdmin:boolean
}

export function useGetOneUser(initialvalues: getUserHookParams, userId: string|undefined) {
    const [curUser, setCurUser] = useState(initialvalues);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const user = await getUserById(userId);
                setCurUser(user);
            } catch (err) {
                if ((err as { message: string }).message == "Resource not found!") {
                    navigate(`404`);
                    return;
                }
                return;
            }
        })()
    }, [userId])

    return {curUser}
}