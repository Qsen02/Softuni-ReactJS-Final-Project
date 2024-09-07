import { clearUserData, getUserData } from "../utils/userHelper";

const host = "http://localhost:3000"

async function requester(method, url, data) {
    const options = {
        method,
        headers: {
            "Content-type": "application/json"
        }
    }
    const userData = getUserData();
    if (userData) {
        options.headers["X-Authorization"] = userData.accessToken;
    }
    if (data) {
        options.body = data;
    }
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            if (response.status == 403) {
                clearUserData();
            }
            const err = await response.json();
            throw new Error(err.message);
        }
        if (response.status == 204) {
            return response;
        }
        const data = await response.json();
        return data;
    } catch (err) {
        throw new Error(err.message);
    }
}

export async function get(url) {
    return await requester("get", `${host}/${url}`);
}

export async function post(url, data) {
    return await requester("post", `${host}/${url}`, data);
}

export async function del(url) {
    return await requester("delete", `${host}/${url}`);
}

export async function put(url, data) {
    return await requester("put", `${host}/${url}`, data);
}