import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

import styles from "../FormsAndErrors.module.css"

import { register } from "../../api/userService";
import { setUserData } from "../../utils/userDataHelper";

import { useForm } from "../../hooks/useForm";
import { UserContext } from "../../context/userContext";

export default function Register() {
    const [errMessage, setErrMessage] = useState({});
    const [isError, setIsError] = useState(false);
    const initalValues = {
        username: "",
        email: "",
        password: "",
        repass: ""
    }
    const navigate = useNavigate();
    const {setUserHanlder}=useContext(UserContext);

    const { formValues, changeHandler, submitHandler } = useForm(initalValues, onRegister);

    async function onRegister() {
        const username = formValues.username;
        const email = formValues.email;
        const password = formValues.password;
        const repass = formValues.repass

        try {
            const user = await register({ username, email, password, repass });
            setUserData(user);
            setUserHanlder(user);
            navigate("/");
        } catch (err) {
            console.log(err.message);
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
                    : errMessage.username
                        ? <label className={styles.errorMessage}>{errMessage.username}</label>
                        : <label>Username</label>
                }
                <input type="text" name="username" value={formValues.username} onChange={changeHandler} />
                {errMessage instanceof Array
                    ? <label className={styles.errorMessage}>{errMessage[0]}</label>
                    : errMessage.email
                        ? <label className={styles.errorMessage}>{errMessage.email}</label>
                        : <label>Email</label>
                }
                <input type="text" name="email" value={formValues.email} onChange={changeHandler} />
                {errMessage instanceof Array
                    ? <label className={styles.errorMessage}>{errMessage[0]}</label>
                    : errMessage.password
                        ? <label className={styles.errorMessage}>{errMessage.password}</label>
                        : <label>Password</label>
                }
                <input type="password" name="password" value={formValues.password} onChange={changeHandler} />
                {errMessage instanceof Array
                    ? <label className={styles.errorMessage}>{errMessage[0]}</label>
                    : errMessage.repass
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