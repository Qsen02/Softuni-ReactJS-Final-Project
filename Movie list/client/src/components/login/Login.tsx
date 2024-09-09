import CustomInput from "../../commons/CustomInput";
import { useUserContext } from "../../context/userContext";
import { useLogin } from "../../hooks/useAuth";
import { loginSchema } from "../../schemas";

import { Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const login = useLogin();
    const { setUserState } = useUserContext();
    const navigate = useNavigate();
    const [errMessage, setErrMessage] = useState<string | [string]>("");

    type FormValues={
        username: string,
        password: string
    }

    async function onLogin(values: FormValues, actions: FormikHelpers<FormValues>) {
        const username = values.username;
        const password = values.password
        try {
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

    return (
        <Formik initialValues={{ username: "", password: "" }} validationSchema={loginSchema} onSubmit={onLogin}>
            {
                (props) => (
                    <Form>
                        <h2>Login here</h2>
                        {errMessage instanceof Array
                            ? <p>{errMessage[0]}</p>
                            : <p>{errMessage}</p>
                        }
                        <CustomInput label="Username" type="text" name="username" />
                        <CustomInput label="Password" type="password" name="password" />
                        <button type="submit">Submit</button>
                    </Form>
                )
            }
        </Formik>
    )
}