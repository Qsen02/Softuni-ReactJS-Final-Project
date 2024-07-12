import ListItem from "./listItem/ListItem"
import styles from "./Header.module.css"

export default function Header() {
    let listItems = [
        {
            link: "/",
            name: "HOME"
        },
        {
            link: "/catalog",
            name: "CATALOG"
        },
        {
            link: "/login",
            name: "LOGIN"
        },
        {
            link: "/register",
            name: "REGISTER"
        }
    ]
    return (
        <header>
            <nav className={styles.navigation}>
                <ul>
                    {listItems.map(el=><ListItem key={el.name} name={el.name} link={el.link}/>)}
                </ul>
            </nav>
        </header>
    )
}
{/* <li><a href="/create">CREATE</a></li>
                <li><a href="/profile">PROFILE</a></li>
                <li><a href="/logout">LOGOUT</a></li> */}