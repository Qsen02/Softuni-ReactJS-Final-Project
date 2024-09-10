import { login, resigter } from "../api/userService"

export function useLogin() {
    async function logingin(data: {}) {
        return await login(data);
    }

    return logingin
}

export function useRegister(){
    async function registration(data: {}) {
        return await resigter(data);
    }

    return registration;
}