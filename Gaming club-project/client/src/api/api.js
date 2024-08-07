import { getUserData, removeUserData } from "../utils/userDataHelper"

const host =
    import.meta.env.VITE_API_URL

async function request(method, url, data) {
    const options = {
        method: method,
        headers: {}
    }
    const userData = getUserData();
    if (userData) {
        options.headers["Content-Type"] = "application/json";
        options.headers["X-Authorization"] = userData.accessToken;
    }
    if (data) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(data);
    }
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            if (response.status == 403) {
                removeUserData();
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
    return await request("get", `${host}${url}`);
}

export async function post(url, data) {
    return await request("post", `${host}${url}`, data);
}

export async function del(url) {
    return await request("delete", `${host}${url}`);
}

export async function put(url, data) {
    return await request("put", `${host}${url}`, data);
}