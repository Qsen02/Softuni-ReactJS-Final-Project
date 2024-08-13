import * as yup from "yup"

export const loginSchema = yup.object().shape({
    username: yup.string().required("Username is required!"),
    password: yup.string().matches(/[A-z0-9]+/g, "Username or password don't match").required("Password is required!")
})

export const registerSchema = yup.object().shape({
    username: yup.string().min(3, "Username must be at least 3 symbols long!").required("Username is required!"),
    email: yup.string().min(3, "Email must be at least 3 symbols long!").email().required("Email is required!"),
    password: yup.string()
        .min(6, "Password must be at least 6 symbols")
        .matches(/[A-z0-9]+/g, "Password must contain only digits and letters")
        .required("Password is required!"),
    repass: yup.string().oneOf([yup.ref("password")], "Password must match!").required("Repeat password is required!")
})