import { Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";

import styles from ".././FormsAndErrors.module.css";

import CustomInput from "../../common/CustomInput";
import { registerSchema } from "../../schemas";

import { useRegister } from "../../hooks/useAuth";
import { useUserContext } from "../../context/UserContext";
import { useState } from "react";

export default function Register() {
    const register = useRegister();
    const [errorMessage, setErrorMessage] = useState("");
    const { setUserHandler } = useUserContext();
    const [isClicked,setIsClicked]=useState(false);
    const navigate = useNavigate();

    async function onRegister(values, actions) {
        const username = values.username;
        const email = values.email;
        const password = values.password;
        const repass = values.repass;
        const address = values.address;
        try {
            setIsClicked(true);
            const user = await register({ username, email, password, repass, address });
            setUserHandler(user);
            actions.resetForm();
            setIsClicked(false);
            navigate("/");
        } catch (err) {
            if (err.message.includes("[")) {
                setErrorMessage(JSON.parse(err.message));
                return;
            }
            setErrorMessage(err.message);
            return;
        }
    }

    return (
        <Formik initialValues={{ username: "", email: "", password: "", repass: "", address: "" }} validationSchema={registerSchema} onSubmit={onRegister}>
            {
                (props) => (
                    <Form className={styles.form}>
                        <h2>Register here</h2>
                        {
                            errorMessage instanceof Array
                                ? <p className={styles.errorDontMatch}>{errorMessage[0]}</p>
                                : <p className={styles.errorDontMatch}>{errorMessage}</p>
                        }
                        <CustomInput label="Username" type="text" name="username" />
                        <CustomInput label="Email" type="text" name="email" />
                        <CustomInput label="Password" type="password" name="password" />
                        <CustomInput label="Repeat password" type="password" name="repass" />
                        <CustomInput label="Address" type="text" name="address" />
                        <p>Already have account? <Link to="/login">Login</Link> here.</p>
                        <button disabled={isClicked?true:false} type="submit">Submit</button>
                    </Form>
                )
            }
        </Formik>
    )
}