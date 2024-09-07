import HeaderItems from "./headerItems/HeaderItems";

export default function Header() {
    type User = {
        username: string,
        email: string,
        isAdmin: boolean
    }|null
    const curUser: User={
        username:"Pesho",
        email:"pesho@gmail.com",
        isAdmin:false
    };
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
            <ul>
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