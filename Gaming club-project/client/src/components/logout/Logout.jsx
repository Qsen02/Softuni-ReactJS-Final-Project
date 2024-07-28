import { Navigate } from "react-router-dom";
import { useUserContext } from "../../context/userContext";

export default function Logout(){
    const {clearUserHandler}=useUserContext()
    clearUserHandler();

   return (
       <Navigate to="/login"/>
   )
}