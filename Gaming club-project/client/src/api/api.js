import { getUserData, removeUserData } from "../utils/userDataHelper"

let host = "http://localhost:3000";

async function request(method, url, data) {
    let options = {
        method: method,
        headers: {}
    }
    let userData = getUserData();
    if (userData) {
        options.headers["Content-Type"] = "application/json";
        options.headers["X-Authorization"] = userData.accessToken;
    }
    if (data) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(data);
    }
    try {
        let response = await fetch(url, options);
        if (!response.ok) {
            if (response.status == 403) {
                removeUserData();
            }
            let err = await response.json();
            throw new Error(err.message);
        }
        if (response.status == 204) {
            return response;
        }
        let data = await response.json();
        return data;
    } catch (err) {
        alert(err.message);
        return;
    }
}

export async function get(url) {
    return await request("get", host + url);
}

export async function post(url, data) {
    return await request("post", host + url, data);
}

export async function del(url) {
    return await request("delete", host + url);
}

export async function put(url, data) {
    return await request("put", host + url, data);
}