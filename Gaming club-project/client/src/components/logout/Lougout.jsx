import { useContext } from "react";
import { UserContext } from "../../context/userContext";

export default function Logout(){
    const {clearUserHandler}=useContext(UserContext);
    clearUserHandler();
   return (
       <>
       </>
   )
}