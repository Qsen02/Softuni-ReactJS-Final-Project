type User={
    _id:string,
    accessToken:string,
    username:string,
    email:string,
    isAdmin:boolean;
}

export function setUserData(data: {}) {
    localStorage.setItem("user", JSON.stringify(data));
}

export function getUserData() {
    const item:string= localStorage.getItem("user");
    const data:User = JSON.parse(item);
    return data;
}

export function clearUserData() {
    localStorage.removeItem("user");
}