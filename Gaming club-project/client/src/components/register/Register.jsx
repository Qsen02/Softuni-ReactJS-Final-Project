import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";

import styles from "../FormsAndErrors.module.css"

import { setUserData } from "../../utils/userDataHelper";

import { useForm } from "../../hooks/useForm";
import { useUserContext } from "../../context/userContext";
import { useRegister } from "../../hooks/useAuth";

export default function Register() {
    const [errMessage, setErrMessage] = useState({});
    const initalValues = {
        username: "",
        email: "",
        password: "",
        repass: ""
    }
    const register = useRegister();
    const { setUserHandler } = useUserContext();
    const navigate = useNavigate();

    const { formValues, changeHandler, submitHandler } = useForm(initalValues, onRegister);

    async function onRegister() {
        const username = formValues.username;
        const email = formValues.email;
        const password = formValues.password;
        const repass = formValues.repass

        try {
            if (!username || !email || !password || !repass) {
                throw new Error("All fields required!");
            }
            const user = await register({ username, email, password, repass });
            setUserData(user);
            setUserHandler(user);
            navigate("/");
        } catch (err) {
            if (err.message === "All fields required!") {
                setErrMessage(err.message);
                return;
            }
            setErrMessage(JSON.parse(err.message));
            setIsError(true);
            return;
        }
    }

    return (
        <>
            <form onSubmit={submitHandler} className={styles.form}>
                <h3>Here you can make your registration</h3>
                {errMessage instanceof Array
                    ? <label className={styles.errorMessage}>{errMessage[0]}</label>
                    : ""
                }
                {typeof (errMessage) == "string"
                    ? <label className={styles.errorMessage}>{errMessage}</label>
                    : ""
                }
                {
                    errMessage.username
                        ? <label className={styles.errorMessage}>{errMessage.username}</label>
                        : <label>Username</label>
                }
                <input type="text" name="username" value={formValues.username} onChange={changeHandler} />
                {
                    errMessage.email
                        ? <label className={styles.errorMessage}>{errMessage.email}</label>
                        : <label>Email</label>
                }
                <input type="text" name="email" value={formValues.email} onChange={changeHandler} />
                {errMessage.password
                    ? <label className={styles.errorMessage}>{errMessage.password}</label>
                    : <label>Password</label>
                }
                <input type="password" name="password" value={formValues.password} onChange={changeHandler} />
                {errMessage.repass
                    ? <label className={styles.errorMessage}>{errMessage.repass}</label>
                    : <label>Repeat password</label>
                }
                <input type="password" name="repass" value={formValues.repass} onChange={changeHandler} />
                <p>You already have account? <Link to="/login">Login</Link> here.</p>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}