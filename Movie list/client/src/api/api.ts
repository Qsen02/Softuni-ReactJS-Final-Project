import { clearUserData, getUserData } from "../utils/userHelper";

const host = "http://localhost:3000"

type Options={
    method:string,
    headers: {
        "Content-Type": string,
        "X-Authorization"?:string
    },
    body?:{}
}

async function requester(method:string, url:string, data?:{}) {
        const options :Options= {
        method,
        headers: {
            "Content-Type": "application/json"
        }
    }
    const userData = getUserData();
    if (userData) {
        options.headers["X-Authorization"] = userData.accessToken;
    }
    if (data) {
        options.body = JSON.stringify(data);
    }
    try {
        const response = await fetch(url, options as {});
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
        const data:[]|{} = await response.json();
        return data;
    } catch (err) {
        throw new Error((err as {message:string}).message);
    }
}

export async function get(url:string) {
    const result:[]|{}=await requester("get", `${host}/${url}`)
    return result;
}

export async function post(url:string, data:{}) {
    const result:[]|{}=await requester("post", `${host}/${url}`, data)
    return result;
}

export async function del(url:string) {
    const result:[]|{}=await requester("delete", `${host}/${url}`)
    return result;
}

export async function put(url:string, data:{}) {
    const result:[]|{}=await requester("put", `${host}/${url}`, data)
    return result;
}