export default function FooterItem({
    curClass,
    name
}) {
    return (
        <li>
            <i className={`fa-brands ${curClass}`}></i>
            <a href="#">{name}</a>
        </li>
    )
}