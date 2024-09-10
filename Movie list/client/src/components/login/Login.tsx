import CustomInput from "../../commons/CustomInput";
import { useUserContext } from "../../context/userContext";
import { useLogin } from "../../hooks/useAuth";
import { loginSchema } from "../../schemas";

import { Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "../FormsAndErrors.module.css";

export default function Login() {
    const login = useLogin();
    const { setUserState } = useUserContext();
    const navigate = useNavigate();
    const [errMessage, setErrMessage] = useState<string | [string]>("");
    const [show, setShow] = useState(false);

    type FormValues = {
        username: string,
        password: string
    }

    async function onLogin(values: FormValues, actions: FormikHelpers<FormValues>) {
        const username = values.username;
        const password = values.password;
        try {
            if(!(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?\/~`|-]).{6,}$/.test(password))){
                throw new Error("Username or password don't match!");
            }
            const user = await login({ username, password });
            actions.resetForm();
            setUserState(user);
            navigate("/");
        } catch (err) {
            if (((err as { message: string }).message).includes("[")) {
                setErrMessage(JSON.parse((err as { message: string }).message));
                return;
            }
            setErrMessage((err as { message: string }).message);
            return;
        }
    }

    function showPassword() {
        if (show) {
            setShow(false);
        } else {
            setShow(true);
        }
    }

    return (
        <Formik initialValues={{ username: "", password: "" }} validationSchema={loginSchema} onSubmit={onLogin}>
            {
                (props) => (
                    <Form className={styles.form}>
                        <h2>Login here</h2>
                        <i className="fa-solid fa-arrow-right-to-bracket"></i>
                        {errMessage instanceof Array
                            ? <p className={styles.error}>{errMessage[0]}</p>
                            : <p className={styles.error}>{errMessage}</p>
                        }
                        <CustomInput label="Username" type="text" name="username" />
                        {show
                            ? <div>
                                <CustomInput label="Password" type="text" name="password" />
                                <i onClick={showPassword} id={styles.seePassword} className="fa-regular fa-eye"></i>
                            </div>
                            : <div>
                                <CustomInput label="Password" type="password" name="password" />
                                <i onClick={showPassword} id={styles.seePassword} className="fa-regular fa-eye"></i>
                            </div>
                        }
                        <p>You don't have account? <Link to="/register">Register</Link> here!</p>
                        <button type="submit">Submit</button>
                    </Form>
                )
            }
        </Formik>
    )
}