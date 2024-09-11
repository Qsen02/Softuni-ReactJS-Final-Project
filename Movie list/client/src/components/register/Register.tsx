import CustomInput from "../../commons/CustomInput";
import { useUserContext } from "../../context/userContext";
import { useRegister } from "../../hooks/useAuth";
import { registerShema } from "../../schemas";

import { Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "../FormsAndErrors.module.css";

export default function Register() {
    const register = useRegister();
    const { setUserState } = useUserContext();
    const navigate = useNavigate();
    const [errMessage, setErrMessage] = useState<string | [string]>("");
    const [showPass, setShowPass] = useState(false);
    const [showRePass, setShowRePass] = useState(false);

    type FormValues = {
        username: string,
        email:string,
        password: string,
        repass:string
    }

    async function onRegister(values: FormValues, actions: FormikHelpers<FormValues>) {
        const username = values.username;
        const email=values.email;
        const password = values.password;
        const repass=values.repass;
        try {
            const user = await register({ username, email,password,repass });
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
        if (showPass) {
            setShowPass(false);
        } else {
            setShowPass(true);
        }
    }

    function showRepass(){
        if (showRePass) {
            setShowRePass(false);
        } else {
            setShowRePass(true);
        }
    }

    return (
        <Formik initialValues={{ username: "", email:"",password: "",repass:"" }} validationSchema={registerShema} onSubmit={onRegister}>
            {
                (props) => (
                    <Form className={styles.form}>
                        <h2>Register here</h2>
                        <i className="fa-solid fa-arrow-right-to-bracket"></i>
                        {errMessage instanceof Array
                            ? <p className={styles.error}>{errMessage[0]}</p>
                            : <p className={styles.error}>{errMessage}</p>
                        }
                        <CustomInput label="Username" type="text" name="username" />
                        <CustomInput label="Email" type="text" name="email" />
                        {showPass
                            ? <div>
                                <CustomInput label="Password" type="text" name="password" />
                                <i onClick={showPassword} id={styles.seePassword} className="fa-regular fa-eye"></i>
                            </div>
                            : <div>
                                <CustomInput label="Password" type="password" name="password" />
                                <i onClick={showPassword} id={styles.seePassword} className="fa-regular fa-eye"></i>
                            </div>
                        }
                        {showRePass
                            ? <div>
                                <CustomInput label="Repeat password" type="text" name="repass" />
                                <i onClick={showRepass} id={styles.seePassword} className="fa-regular fa-eye"></i>
                            </div>
                            : <div>
                                <CustomInput label="Repeat password" type="password" name="repass" />
                                <i onClick={showRepass} id={styles.seePassword} className="fa-regular fa-eye"></i>
                            </div>
                        }
                        <p>You already have account? <Link to="/login">Login</Link> here!</p>
                        <button type="submit">Submit</button>
                    </Form>
                )
            }
        </Formik>
    )
}