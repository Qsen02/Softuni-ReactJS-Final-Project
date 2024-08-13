import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";

import styles from "../FormsAndErrors.module.css"

import { setUserData } from "../../utils/userDataHelper";

import { useForm } from "../../hooks/useForm";
import { useUserContext } from "../../context/userContext";
import { useRegister } from "../../hooks/useAuth";
import { Formik, Form } from "formik";
import CustomInput from "../../common/CustomInput";
import { registerSchema } from "../../schemas";

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

    async function onRegister(value,actions) {
        const username = value.username;
        const email = value.email;
        const password = value.password;
        const repass = value.repass
        try {
            const user = await register({ username, email, password, repass });
            setUserData(user);
            setUserHandler(user);
            actions.resetForm();
            navigate("/");
        } catch (err) {
            if(err.message.includes("[")){
                setErrMessage(JSON.parse(err.message));
                return
            }
            setErrMessage(err.message);
            return;
        }
    }

    return (
        <>
            <Formik initialValues={{username:"",email:"",password:"",repass:""}} validationSchema={registerSchema} onSubmit={onRegister}>
                {(props) => (
                    <Form className={styles.form}>
                        <h3>Here you can make your registration</h3>
                        {errMessage instanceof Array
                            ? <label className={styles.errorMessage}>{errMessage[0]}</label>
                            : ""
                        }
                        {typeof (errMessage) == "string"
                            ? <label className={styles.errorMessage}>{errMessage}</label>
                            : ""
                        }
                        <CustomInput label="Username" type="text" name="username"/>
                        <CustomInput label="Email" type="text" name="email"/>
                        <CustomInput label="Password" type="password" name="password"/>
                        <CustomInput label="Repeat password" type="password" name="repass"/>
                        <p>You already have account? <Link to="/login">Login</Link> here.</p>
                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </>
    )
}