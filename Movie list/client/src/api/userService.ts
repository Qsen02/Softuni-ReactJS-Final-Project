import { get, post } from "./api"

const endpoint = "users";

type User = {
    _id: string,
    username: string,
    email: string,
    isAdmin: boolean,
    accessToken: string
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

type getUserParams = {
    savedMovies: [],
    createdMovies: [],
    likedMovies: [],
    profileImage:"",
    username:"",
    email:"",
    isAdmin:boolean
}

export async function getUserById(userId: string|undefined) {
    const user = await get(`${endpoint}/${userId}`);
    return user as getUserParams;
}