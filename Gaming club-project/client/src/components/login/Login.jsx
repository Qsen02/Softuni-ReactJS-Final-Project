import { login } from "../../api/userService";
import { useForm } from "../../hooks/useForm";
import { setUserData } from "../../utils/userDataHelper";
import styles from "../FormsAndErrors.module.css"
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login({
    setUser
}) {
    const [errMessage, setErrMessage] = useState({});
    const [isError, setIsError] = useState(false);
    const initalValues = {
        username: "",
        password: "",
    }

    const navigate = useNavigate();

    const { formValues, changeHandler, submitHandler } = useForm(initalValues, onLogin);

    async function onLogin() {
        let username = formValues.username;
        let password = formValues.password;

        try {
            const user = await login({ username, password });
            setUserData(user);
            setUser(user);
            navigate("/");
        } catch (err) {
            console.log(err.message)
            setErrMessage(JSON.parse(err.message));
            setIsError(true);
            return;
        }
    }

    function onClose() {
        setIsError(false);
    }

    return (
        <>
            <form onSubmit={submitHandler} className={styles.form}>
                <h3>Here you can login in your account</h3>
                {errMessage instanceof Array
                    ? <label className={styles.errorMessage}>{errMessage[0]}</label>
                    : errMessage.username
                        ? <label className={styles.errorMessage}>{errMessage.username}</label>
                        : <label>Username</label>
                }
                <input type="text" name="username" value={formValues.username} onChange={changeHandler} />
                {errMessage instanceof Array
                    ? <label className={styles.errorMessage}>{errMessage[0]}</label>
                    : errMessage.password
                        ? <label className={styles.errorMessage}>{errMessage.password}</label>
                        : <label>Password</label>
                }
                <input type="password" name="password" value={formValues.password} onChange={changeHandler} />
                <p>You don't have account? <Link to="/register">Register</Link> here.</p>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}