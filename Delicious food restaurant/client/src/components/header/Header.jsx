import NavItems from "./navItems/NavItems"

export default function Header() {
    const user=null;
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
        <ul>
            {user
                ? user.isAdmin
                    ? adminNav.map(el => <NavItems key={el.title} link={el.link} title={el.title} />)
                    : userNav.map(el => <NavItems key={el.title} link={el.link} title={el.title} />)
                : guestNav.map(el => <NavItems key={el.title} link={el.link} title={el.title} />)
            }
        </ul>
    )
}