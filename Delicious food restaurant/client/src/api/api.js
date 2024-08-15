import { deleteUserData, getUserData } from "../utils/userHelper"

const host = "http://localhost:3000";

async function requester(method, url, data) {
    const options = {
        method: method,
        headers: {}
    }
    const userData = getUserData();
    headers["Content-type"] = "Application/json";
    if (userData) {
        headers["X-Authorization"] = userData.accessToken;
    }
    if (data) {
        options.body = JSON.stringify(data);
    }
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            if (response.status == 403) {
                deleteUserData();
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
    return await requester("get", `${host}${url}`);
}

export async function post(url, data) {
    await requester("post", `${host}${url}`, data);
}

export async function del(url) {
    await requester("delete", `${host}${url}`);
}

export async function put(url, data) {
    await requester("put", `${host}${url}`, data);
}