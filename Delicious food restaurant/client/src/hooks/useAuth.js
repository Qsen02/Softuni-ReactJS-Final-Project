import { login } from "../api/userService";

export function useLogin() {
    async function logingin(data) {
        return await login(data);
    }

    return logingin;

}