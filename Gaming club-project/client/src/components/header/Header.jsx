import ListItem from "./listItem/ListItem"
import styles from "./Header.module.css"

export default function Header({
    isUser
}) {
    let guest = [
        { link: "/", name: "HOME" },
        { link: "/catalog", name: "CATALOG" },
        { link: "/login", name: "LOGIN" },
        { link: "/register", name: "REGISTER" }
    ]
    let user = [
        { link: "/", name: "HOME" },
        { link: "/catalog", name: "CATALOG" },
        { link: "/create", name: "CREATE" },
        { link: "/profile", name: "PROFILE" },
        { link: "/logout", name: "LOGOUT" }
    ]
    return (
        <header>
            <nav className={styles.navigation}>
                <ul>
                    {isUser
                        ? user.map(el => <ListItem key={el.name} name={el.name} link={el.link} />)
                        : guest.map(el => <ListItem key={el.name} name={el.name} link={el.link} />)
                    }
                </ul>
            </nav>
        </header>
    )
}
