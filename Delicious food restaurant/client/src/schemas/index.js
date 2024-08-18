import * as yup from "yup"

export const loginSchema = yup.object().shape({
    username: yup.string().required("Username required!"),
    password: yup.string().required("Password required!")
})

export const registerSchema = yup.object().shape({
    username: yup.string().min(3, "Username must be at least 3 characters long!").required("Username required!"),
    email: yup.string().email().min(3, "Email must be at least 3 characters long!").required("Email required!"),
    password: yup.string().matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?\/~`|-]).{6,}$/, "Password must be at least 6 symbols and must contain 1 special symbol and digits and letters").required("Password required!"),
    repass: yup.string().oneOf([yup.ref("password")], "Password must match!").required("Repeat password required!"),
    address: yup.string().min(3, "Address must be at least 3 characters long!").required("Address required!")
})

export const createSchema = yup.object().shape({
    title: yup.string().min(3, "Title must be at least 3 characters long!").required("Title required!"),
    price: yup.number().min(0, "Price must be positive numnber!").required("Price required!"),
    category: yup.string().min(3, "Category must be at least 3 characters long!").required("Category required!"),
    image: yup.string().matches(/^https?:\/\//, "Image URL must begin with http or https!").required("Image required"),
    description: yup.string().min(10, "Description must be between 10 and 200 characters long!").max(200, "Description must be between 10 and 200 characters long!").required("Description required!")
})