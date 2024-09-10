import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/userContext";

import styles from "./Logout.module.css";

export default function Logout(){
    const {clearUserState}=useUserContext();
    const navigate=useNavigate();

    async function onLogout(){
        await clearUserState();
        navigate("/");
    }

    async function onBack(){
        navigate("/");
    }

    return(
        <div className={styles.modal}>
            <div>
                <h3>Are you sure want to logout?</h3>
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                <button onClick={onLogout}>Logout</button>
                <button onClick={onBack}>Back</button>
            </div>
        </div>
    )
}