import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../context/userContext"

export default function GuestComponent() {
    const { user } = useUserContext();

    return (
        <>
            {user
                ? <Navigate to="/" />
                : <Outlet/>
            }
        </>
    )
}