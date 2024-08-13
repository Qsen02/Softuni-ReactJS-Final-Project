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

export const gameSchema = yup.object().shape({
    name: yup.string().min(3, "Name must be at least 3 characters long!").required("Name is required!"),
    year: yup.number().min(1960, "Year must be between 1960 and 2030!").max(2030, "Year must be between 1960 and 2030!").required("Year is required!"),
    category: yup.string().min(3, "Category must be at least 3 characters long!").required("Category is required!"),
    creator: yup.string().min(3, "Creator must be at least 3 characters long!").required("Creator is required"),
    description: yup.string().min(20, "Description must be between 20 and 1000 characters long!").max(1000, "Description must be between 20 and 1000 characters long!").required("Description is required!"),
    image: yup.string().matches(/^https?:\/\//, "Image must be valid URL!").required("Image is required!")
})