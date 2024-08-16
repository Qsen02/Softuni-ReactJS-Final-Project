import { NavLink } from "react-router-dom";
import styles from "./NavItem.module.css"

export default function NavItems({
    link, title
}) {
    return (
        <li className={styles.item}>
            <NavLink
                style={({ isActive }) => isActive ? { color: "rgb(166, 158, 167)" } : {}}
                to={link}
            >
                {title}
            </NavLink>
        </li>
    )
}