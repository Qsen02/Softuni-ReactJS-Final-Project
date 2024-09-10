import * as yup from "yup";

export const loginSchema=yup.object().shape({
    username: yup.string().required("Username is required!"),
    password: yup.string().required("Password is required!")
})

export const registerShema=yup.object().shape({
    username:yup.string().min(3,"Username mut be at least 3 characters long!").required("Username is required!"),
    email:yup.string().min(3,"Email mut be at least 3 characters long!").email("Email must be valid email!").required("Email is required!"),
    password:yup.string()
    .min(6,"Password must be at least 6 symbols long!")
    .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?\/~`|-]).{6,}$/,"Password must contain capital letter, digits and special symbol.")
    .required("Password is required!"),
    repass:yup.string().oneOf([yup.ref("password")],"Password must match!").required("Repeat password required!")
})