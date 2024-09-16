import { Form, Formik, FormikHelpers } from "formik"
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import CustomInput from "../../../commons/CustomInput"

import { editUserSchema } from "../../../schemas";
import { useEditUser } from "../../../hooks/useAuth";

import styles from "../../FormsAndErrors.module.css";

type ProfileEditProps = {
    user: {},
    setUser: React.Dispatch<React.SetStateAction<{}>>
}

export default function ProfileEdit({
    user, setUser
}: ProfileEditProps) {

    const navigate = useNavigate();
    const [errMessage, setErrMessage] = useState<string | [string]>("");
    const editUser = useEditUser();
    const { userId } = useParams();

    type FormValues = {
        profileImage: string,
        username: string,
        email: string
    }

    async function onEdit(values: FormValues, actions: FormikHelpers<FormValues>) {
        const profileImage = values.profileImage;
        const username = values.username;
        const email = values.email;
        try {
            const user = await editUser(userId, { profileImage, username, email });
            setUser(user);
            actions.resetForm();
            navigate("/profile");
        } catch (err) {
            if (((err as { message: string }).message).includes("[")) {
                setErrMessage(JSON.parse((err as { message: string }).message));
                return;
            }
            setErrMessage((err as { message: string }).message);
            return;
        }
    }

    function onBack(){
        navigate("/profile");
    }

    return (
        <Formik initialValues={{
            profileImage: (user as { profileImage: string }).profileImage,
            username: (user as { username: string }).username,
            email: (user as { email: string }).email,
        }}
            validationSchema={editUserSchema}
            onSubmit={onEdit}
            enableReinitialize={true}
        >
            {
                (props) => (
                    <div className={styles.modal}>
                        <Form className={styles.form}>
                            <h2>Edit your profile</h2>
                            {errMessage instanceof Array
                                ? <p className={styles.error}>{errMessage[0]}</p>
                                : <p className={styles.error}>{errMessage}</p>
                            }
                            <CustomInput label="Profile image" type="text" name="profileImage" />
                            <CustomInput label="Username" type="text" name="username" />
                            <CustomInput label="Email" type="text" name="email" />
                            <button type="submit" className={styles.editFormButtons}>Edit</button>
                            <button onClick={onBack} className={styles.editFormButtons}>Cancel</button>
                        </Form>
                    </div>
                )
            }
        </Formik>
    )
}