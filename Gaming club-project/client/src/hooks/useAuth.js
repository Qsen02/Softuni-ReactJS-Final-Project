import { login, register } from "../api/userService";

export function useLogin() {
    async function logingin(userData) {
        const user = await login(userData);
        return user;
    }
    return logingin;
}

export function useRegister() {
    async function registrating(userData) {
        const user = await register(userData);
        return user;
    }
    return registrating;
}