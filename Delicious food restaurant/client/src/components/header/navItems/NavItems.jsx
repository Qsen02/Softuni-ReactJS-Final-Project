import { NavLink } from "react-router-dom";

export default function NavItems({
    link, title
}) {
    return (
        <li><NavLink to={link}>{title}</NavLink></li>
    )
}