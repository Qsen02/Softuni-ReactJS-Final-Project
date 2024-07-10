import styles from "./Footer.module.css"
import FooterItem from "./footerItem/FooterItem"

export default function Footer() {
    let footerItems = [
        {
            class: "fa-facebook",
            name: "Facebook"
        },
        {
            class: "fa-instagram",
            name: "Instagram"
        },
        {
            class: "fa-twitter",
            name: "Twitter"
        }
    ]
    return (
        <footer className={styles.footer}>
            <div>
                <p>@Gaming club</p>
            </div>
            <ul>
            {footerItems.map(el=> <FooterItem key={el.name} curClass={el.class} name={el.name}/>)}
            </ul>
        </footer>
    )
}