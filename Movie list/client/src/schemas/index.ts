import * as yup from "yup";

export const loginSchema=yup.object().shape({
    username: yup.string().required("Username is required!"),
    password: yup.string().matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?\/~`|-]).{6,}$/, "Username or password don't match").required("Password is required!")
})