import { Formik } from "formik";
import { Link } from "react-router-dom";

import styles from ".././FormsAndErrors.module.css"

export default function Login() {
    return (
        <form className={styles.form}>
            <h2>Login here</h2>
            <label>Username</label>
            <input type="text" name="username" />
            <label>Password</label>
            <input type="password" name="password" />
            <p>Don't have account? <Link to="/register">Register</Link> here.</p>
            <button type="submit">Submit</button>
        </form>
    )
}