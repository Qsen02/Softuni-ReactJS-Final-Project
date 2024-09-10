import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/userContext"

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
        <div>
            <div>
                <h2>Are you sure want to logout?</h2>
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                <button onClick={onLogout}>Logout</button>
                <button onClick={onBack}>Back</button>
            </div>
        </div>
    )
}