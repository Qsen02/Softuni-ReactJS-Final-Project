import * as yup from "yup";

export const loginSchema = yup.object().shape({
    username: yup.string().required("Username is required!"),
    password: yup.string().required("Password is required!")
})

export const registerShema = yup.object().shape({
    username: yup.string().min(3, "Username mut be at least 3 characters long!").required("Username is required!"),
    email: yup.string().min(3, "Email mut be at least 3 characters long!").email("Email must be valid email!").required("Email is required!"),
    password: yup.string()
        .min(6, "Password must be at least 6 symbols long!")
        .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?\/~`|-]).{6,}$/, "Password must contain capital letter, digits and special symbol.")
        .required("Password is required!"),
    repass: yup.string().oneOf([yup.ref("password")], "Password must match!").required("Repeat password required!")
})

export const createMovieSchema = yup.object().shape({
    title: yup.string().min(3, "Title must be at least 3 characters long!").required("Title is required!"),
    genre: yup.string().min(3, "Genre must be at least 3 characters long!").required("Genre is required!"),
    image: yup.string().matches(/^https?:\/\//, "Image must be valid URL!").required("Image is required!"),
    year: yup.number().min(1960, "Year must be between 1960 and 2030!").max(2030, "Year must be between 1960 and 2030!").required("Year is required!"),
    description: yup.string().min(10, "Description must be between 10 and 1000 characters!").max(1000, "Description must be between 10 and 1000 characters!").required("Description is required!")
})

export const editUserSchema = yup.object().shape({
    profileImage: yup.string().matches(/^https?:\/\//, "Image must be valid URL!"),
    username: yup.string().min(3, "Username mut be at least 3 characters long!").required("Username is required!"),
    email: yup.string().email().min(3, "Email mut be at least 3 characters long!").email("Email must be valid email!").required("Email is required!"),
})

export const changePasswordSchema = yup.object().shape({
    newPassword: yup.string()
        .min(6, "Password must be at least 6 symbols long!")
        .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?\/~`|-]).{6,}$/, "Password must contain capital letter, digits and special symbol.")
        .required("Password is required!"),
})
