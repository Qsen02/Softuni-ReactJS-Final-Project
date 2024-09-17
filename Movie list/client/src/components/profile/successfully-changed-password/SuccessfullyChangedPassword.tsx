import { useNavigate } from "react-router-dom";

import styles from "./Successfull.module.css";

export default function SuccessfullyChangedPassword() {
    const navigate = useNavigate();

    function proceed() {
        navigate("/profile");
    }

    return (
        <div className={styles.modal}>
            <section>
                <h2>Password changed successfully!</h2>
                <button onClick={proceed}>OK</button>
            </section>
        </div>
    )
}