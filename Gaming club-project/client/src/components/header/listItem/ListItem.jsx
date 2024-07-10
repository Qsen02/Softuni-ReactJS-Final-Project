import styles from "./ListItem.module.css"

export default function ListItem({
    name,
    link,
    linkSetter
}){
   return (
       <li className={styles.listItem}><a onClick={linkSetter}  href={link}>{name}</a></li>
   )
}