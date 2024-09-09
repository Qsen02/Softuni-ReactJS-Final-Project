import HeaderItems from "./headerItems/HeaderItems";

import styles from "./Header.module.css";
import { useUserContext } from "../../context/userContext";

export default function Header() {

const {user}=useUserContext();

    const guest = [
        { name: "HOME", link: "/" },
        { name: "CATALOG", link: "/catalog" },
        { name: "LOGIN", link: "/login" },
        { name: "REGISTER", link: "/register" },
    ]
    const authUser = [
        { name: "HOME", link: "/" },
        { name: "CATALOG", link: "/catalog" },
        { name: "PROFILE", link: "/profile" },
        { name: "LOGOUT", link: "/logout" },
    ]
    const admin = [
        { name: "HOME", link: "/" },
        { name: "CATALOG", link: "/catalog" },
        { name: "ADD", link: "/create" },
        { name: "PROFILE", link: "/profile" },
        { name: "LOGOUT", link: "/logout" },
    ]
    return (
        <header>
            <ul className={styles.navigation}>
                {user
                    ? user.isAdmin
                        ? admin.map(el => <HeaderItems key={el.name} name={el.name} link={el.link} />)
                        : authUser.map(el => <HeaderItems key={el.name} name={el.name} link={el.link} />)
                    : guest.map(el => <HeaderItems key={el.name} name={el.name} link={el.link} />)
                }
            </ul>
        </header>
    )
}