import styles from "./ListItem.module.css"
import { NavLink } from "react-router-dom"

export default function ListItem({
    name,
    link,
}) {
    return (
        <li className={styles.listItem}>
            <NavLink
                style={({ isActive }) => isActive ? { color: "rgb(0, 205, 255)" } : {}}
                to={link}
            >
                {name}
            </NavLink>
        </li>
    )
}