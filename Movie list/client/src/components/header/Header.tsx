import HeaderItems from "./headerItems/HeaderItems";

import styles from "./Header.module.css";

export default function Header() {
    type User = {
        _id: string,
        username: string,
        email: string,
        isAdmin?: boolean
    } | null

    const curUser: User = null;

    const guest = [
        { name: "HOME", link: "/" },
        { name: "CATALOG", link: "/catalog" },
        { name: "LOGIN", link: "/login" },
        { name: "REGISTER", link: "/register" },
    ]
    const user = [
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
                {curUser
                    ? curUser?.isAdmin
                        ? admin.map(el => <HeaderItems key={el.name} name={el.name} link={el.link} />)
                        : user.map(el => <HeaderItems key={el.name} name={el.name} link={el.link} />)
                    : guest.map(el => <HeaderItems key={el.name} name={el.name} link={el.link} />)
                }
            </ul>
        </header>
    )
}