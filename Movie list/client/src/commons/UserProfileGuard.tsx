import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../context/userContext"

export default function UserProfileGuard() {
    const { user } = useUserContext();

    return (
        <>
            {user && !user.isAdmin
                ? <Outlet />
                : <Navigate to="/" />
            }
        </>
    )
}