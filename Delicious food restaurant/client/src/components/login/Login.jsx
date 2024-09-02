import { Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";

import styles from ".././FormsAndErrors.module.css";

import CustomInput from "../../common/CustomInput";
import { loginSchema } from "../../schemas";

import { useLogin } from "../../hooks/useAuth";
import { useUserContext } from "../../context/UserContext";
import { useState } from "react";

export default function Login() {
    const login = useLogin();
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const { setUserHandler } = useUserContext();
    const [isClicked,setIsClicked]=useState(false);
    const navigate = useNavigate();

    async function onLogin(values, actions) {
        const username = values.username;
        const password = values.password;
        try {
            setIsClicked(true);
            if (username.length < 3) {
                setIsClicked(false);
                throw new Error("Username or password don't match!");
            }
            if (!(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?\/~`|-]).{6,}$/.test(password))) {
                setIsClicked(false);
                throw new Error("Username or password don't match!");
            }
            const user = await login({ username, password });
            setUserHandler(user);
            actions.resetForm();
            setIsClicked(false);
            navigate("/");
        } catch (err) {
            setIsError(true);
            if (err.message.includes("[")) {
                setErrorMessage(JSON.parse(err.message));
                return;
            }
            setErrorMessage(err.message);
            return;
        }
    }

    return (
        <Formik initialValues={{ username: "", password: "" }} validationSchema={loginSchema} onSubmit={onLogin}>
            {
                (props) => (
                    <Form className={styles.form}>
                        <h2>Login here</h2>
                        {isError
                            ? errorMessage instanceof Array
                                ? <p className={styles.errorDontMatch}>{errorMessage[0]}</p>
                                : <p className={styles.errorDontMatch}>{errorMessage}</p>
                            : ""
                        }
                        <CustomInput label="Username" type="text" name="username" />
                        <CustomInput label="Password" type="password" name="password" />
                        <p>Don't have account? <Link to="/register">Register</Link> here.</p>
                        <button disabled={isClicked?true:false} type="submit">Submit</button>
                    </Form>
                )
            }
        </Formik>
    )
}