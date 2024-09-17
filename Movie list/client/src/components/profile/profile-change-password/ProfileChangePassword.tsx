import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Form, Formik, FormikHelpers } from "formik";

import { useChangePassword } from "../../../hooks/useAuth"
import CustomInput from "../../../commons/CustomInput";
import { changePasswordSchema } from "../../../schemas";

import styles from "../../FormsAndErrors.module.css";

type ProfileChangePasswordProps={
    setCurUser: React.Dispatch<React.SetStateAction<{}>>
}

export default function ProfileChangePassword({
    setCurUser
}:ProfileChangePasswordProps) {
    const changePassword = useChangePassword();
    const { userId } = useParams();
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const [errMessage, setErrMessage] = useState<string | [string]>("")

    async function onChangePassword(values: { newPassword: string }, actions: FormikHelpers<{ newPassword: string }>) {
        const newPassword = values.newPassword;
        try {
            const user = await changePassword(userId, { newPassword });
            actions.resetForm();
            setCurUser(user);
            navigate("/profile/successfullyChanged");
        } catch (err) {
            if (((err as { message: string }).message).includes("[")) {
                setErrMessage(JSON.parse((err as { message: string }).message));
                return;
            }
            if ((err as { message: string }).message == "Resource not found!") {
                navigate(`404`);
                return;
            }
            setErrMessage((err as { message: string }).message);
            return;
        }
    }

    function showPassword() {
        if (show) {
            setShow(false);
        } else {
            setShow(true);
        }
    }

    function onCancel() {
        try {
            navigate("/profile");
        } catch (err) {
            if ((err as { message: string }).message == "Resource not found!") {
                navigate(`404`);
                return;
            }
            return;
        }
    }

    return (
        <Formik initialValues={{ newPassword: "" }} validationSchema={changePasswordSchema} onSubmit={onChangePassword}>
            {
                (props) => (
                    <div className={styles.modal}>
                        <Form className={styles.form}>
                            <h2>Change password</h2>
                            {errMessage instanceof Array
                                ? <p className={styles.error}>{errMessage[0]}</p>
                                : <p className={styles.error}>{errMessage}</p>
                            }
                            {show
                                ? <div>
                                    <CustomInput type="text" name="newPassword" />
                                    <i onClick={showPassword} id={styles.seeChangePassword} className="fa-regular fa-eye"></i>
                                </div>
                                : <div>
                                    <CustomInput type="password" name="newPassword" />
                                    <i onClick={showPassword} id={styles.seeChangePassword} className="fa-regular fa-eye"></i>
                                </div>
                            }
                            <button type="submit" className={styles.editFormButtons}>Change</button>
                            <button onClick={onCancel} className={styles.editFormButtons}>Cancel</button>
                        </Form>
                    </div>
                )
            }
        </Formik>
    )
}