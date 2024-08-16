import * as yup from "yup"

export const loginSchema = yup.object().shape({
    username: yup.string().required("Username required!"),
    password: yup.string().required("Password required!")
})