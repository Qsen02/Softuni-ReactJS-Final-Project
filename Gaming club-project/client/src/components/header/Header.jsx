import ListItem from "./listItem/ListItem"
import styles from "./Header.module.css"
import { useContext } from "react"
import { UserContext } from "../../context/userContext"

export default function Heade() {
    const { user } = useContext(UserContext);
    let isGuest = [
        { link: "/", name: "HOME" },
        { link: "/catalog", name: "CATALOG" },
        { link: "/login", name: "LOGIN" },
        { link: "/register", name: "REGISTER" }
    ]
    let isUser = [
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
                    {user
                        ? isUser.map(el => <ListItem key={el.name} name={el.name} link={el.link} />)
                        : isGuest.map(el => <ListItem key={el.name} name={el.name} link={el.link} />)
                    }
                </ul>
            </nav>
        </header>
    )
}
