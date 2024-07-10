import styles from "./ListItem.module.css"

export default function ListItem({
    name,
    link,
    linkSetter
}){
   return (
       <li onClick={linkSetter} className={styles.listItem}><a href={link}>{name}</a></li>
   )
}