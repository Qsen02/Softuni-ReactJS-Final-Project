import { useState } from "react"
import styles from "../FormsAndErrors.module.css"
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../api/userService";
import { setUserData } from "../../utils/userDataHelper";

export default function Register({
    setUser
}) {
    let [errMessage, setErrMessage] = useState({});
    let [isError, setIsError] = useState(false);
    let [formValues, setFormValues] = useState({
        username: "",
        email: "",
        password: "",
        repass: ""
    })
    let navigate = useNavigate();
    function changeHandler(event) {
        setFormValues(oldValues => ({ ...oldValues, [event.target.name]: event.target.value }))
    }

    async function onRegister(event) {
        event.preventDefault();
        let username = formValues.username;
        let email = formValues.email;
        let password = formValues.password;
        let repass = formValues.repass

        try {
            let user = await register({ username, email, password, repass });
            setUserData(user);
            setFormValues(oldValues => ({
                ...oldValues,
                username: "",
                email: "",
                password: "",
                repass: ""
            }))
            setUser(user);
            navigate("/");
        } catch (err) {
            console.log(err.message);
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
                        <p>{errMessage.email}</p>
                        <p>{errMessage.password}</p>
                        <p>{errMessage.repass}</p>
                    </div >
                : ""
            }
            <form onSubmit={onRegister} className={styles.form}>
                <h3>Here you can make your registration</h3>
                <label className={errMessage.username ? styles.errorLabel : ""}>Username</label>
                <input type="text" name="username" value={formValues.username} onChange={changeHandler} />
                <label className={errMessage.email ? styles.errorLabel : ""}>Email</label>
                <input type="text" name="email" value={formValues.email} onChange={changeHandler} />
                <label className={errMessage.password ? styles.errorLabel : ""}>Password</label >
                <input type="password" name="password" value={formValues.password} onChange={changeHandler} />
                <label className={errMessage.repass ? styles.errorLabel : ""}>Repeat password</label>
                <input type="password" name="repass" value={formValues.repass} onChange={changeHandler} />
                <p>You already have account? <Link to="/login">Login</Link> here.</p>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}