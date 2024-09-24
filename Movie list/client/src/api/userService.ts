import { get, post, put } from "./api"

const endpoint = "users";

type User = {
    _id: string,
    username: string,
    email: string,
    isAdmin: boolean,
    accessToken: string,
    profileImage: string
} | null

export async function resigter(data: {}) {
    const user = await post(`${endpoint}/register`, data)
    return user as User;
}

export async function login(data: {}) {
    const user = await post(`${endpoint}/login`, data)
    return user as User;
}

export async function logout() {
    await get(`${endpoint}/logout`);
}

export async function getUserById(userId: string|undefined) {
    return await get(`${endpoint}/${userId}`);
}

export async function editUser(userId:string|undefined,data:{}){
    return await put(`${endpoint}/${userId}/edit`,data);
}

export async function changePassword(userId:string|undefined,data:{}){
    return await put(`${endpoint}/${userId}/change/password`,data);
}