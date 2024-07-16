import { login } from "../../api/userService";
import { setUserData } from "../../utils/userDataHelper";
import styles from "../FormsAndErrors.module.css"
import { useState,useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";

export default function Login({
    setUser
}) {
    let [errMessage, setErrMessage] = useState({});
    let [isError, setIsError] = useState(false);
    let [formValues, setFormValues] = useState({
        username: "",
        password: "",
    })

    let navigate = useNavigate();

    function changeHandler(event) {
        setFormValues(oldValues => ({ ...oldValues, [event.target.name]: event.target.value }))
    }

    async function onLogin(event) {
        event.preventDefault();
        let username = formValues.username;
        let password = formValues.password;

        try {
            let user = await login({ username,  password});
            setUserData(user);
            setFormValues(oldValues => ({
                ...oldValues,
                username: "",
                password: "",
            }))
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
            {isError
                ? errMessage instanceof Array
                    ? <div onClick={onClose} className={styles.error}>
                        <p>{errMessage[0]}</p>
                    </div >
                    : <div onClick={onClose} className={styles.error}>
                        <p>{errMessage.username}</p>
                        <p>{errMessage.password}</p>
                    </div >
                : ""
            }
            <form onSubmit={onLogin} className={styles.form}>
                <h3>Here you can login in your account</h3>
                <label className={errMessage.username ? styles.errorLabel : ""}>Username</label>
                <input type="text" name="username" value={formValues.username} onChange={changeHandler} />
                <label className={errMessage.password ? styles.errorLabel : ""}>Password</label >
                <input type="password" name="password" value={formValues.password} onChange={changeHandler} />
                <p>You don't have account? <Link to="/register">Register</Link> here.</p>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}