import { setUserData } from "../../utils/userDataHelper";

import styles from "../FormsAndErrors.module.css"

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, useField } from "formik";

import { useUserContext } from "../../context/userContext";
import { useLogin } from "../../hooks/useAuth";
import { loginSchema } from "../../schemas";
import CustomInput from "../../common/CustomInput";

export default function Login() {
    const [errMessage, setErrMessage] = useState({});
    const { setUserHandler } = useUserContext();
    const login = useLogin();
    const navigate = useNavigate();
    const [clicked, setClicked] = useState(false);

    async function onLogin(values, actions) {
        const username = values.username;
        const password = values.password;
        try {
            setClicked(true);
            if (username.length < 3) {
                setClicked(false);
                throw new Error("Username or password don't match!");
            }
            if (password.length < 6) {
                setClicked(false);
                throw new Error("Username or password don't match!");
            }
            const user = await login({ username, password });
            setUserData(user);
            setUserHandler(user);
            actions.resetForm();
            setClicked(false);
            navigate("/");
        } catch (err) {
            if (err.message.includes("[")) {
                setErrMessage(JSON.parse(err.message));
                return;
            }
            setErrMessage(err.message);
            return;
        }
    }

    return (
        <>
            <Formik initialValues={{ username: "", password: "" }} validationSchema={loginSchema} onSubmit={onLogin}>
                {
                    (props) => (
                        <Form className={styles.form}>
                            <h3>Here you can login in your account</h3>
                            {errMessage instanceof Array
                                ? <label className={styles.errorMessage}>{errMessage[0]}</label>
                                : ""
                            }
                            {typeof (errMessage) == "string"
                                ? <label className={styles.errorMessage}>{errMessage}</label>
                                : ""
                            }
                            <CustomInput label="Username" type="text" name="username" />
                            <CustomInput label="Password" type="password" name="password" />
                            <p>You don't have account? <Link to="/register">Register</Link> here.</p>
                            <button disabled={clicked ? true : false} type="submit">Submit</button>
                        </Form>
                    )
                }
            </Formik>
        </>
    )
}