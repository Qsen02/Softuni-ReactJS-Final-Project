import NavItems from "./navItems/NavItems"

import styles from "./Header.module.css"

import { useUserContext } from "../../context/UserContext"

export default function Header() {
    const { user } = useUserContext();

    const userNav = [
        { link: "/", title: "HOME" },
        { link: "/catalog", title: "CATALOG" },
        { link: "/cart", title: "CART" },
        { link: "/profile", title: "PROFILE" },
        { link: "/logout", title: "LOGOUT" }
    ]
    const adminNav = [
        { link: "/", title: "HOME" },
        { link: "/catalog", title: "CATALOG" },
        { link: "/create", title: "CREATE" },
        { link: "/profile", title: "PROFILE" },
        { link: "/logout", title: "LOGOUT" }
    ]
    const guestNav = [
        { link: "/", title: "HOME" },
        { link: "/catalog", title: "CATALOG" },
        { link: "/login", title: "LOGIN" },
        { link: "/register", title: "REGISTER" }
    ]

    return (
        <header className={styles.header}>
            <ul>
            <li><img src="/assets/restaurant-logo,restaurant-icon-logo-free-design-template-e4e92c7d3b5631a777fce7a5d629a00a_screen.jpg"/></li>
                {user
                    ? user.isAdmin
                        ? adminNav.map(el => <NavItems key={el.title} link={el.link} title={el.title} />)
                        : userNav.map(el => <NavItems key={el.title} link={el.link} title={el.title} />)
                    : guestNav.map(el => <NavItems key={el.title} link={el.link} title={el.title} />)
                }
            </ul>
        </header>
    )
}